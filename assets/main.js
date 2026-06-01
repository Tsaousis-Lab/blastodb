/**
 * Mobile Navigation Toggle
 */
document.addEventListener("DOMContentLoaded", function () {
  console.log("[Collector] DOMContentLoaded fired");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  // Initialize navigation dropdowns
  initializeNavDropdowns();

  const collectors = document.querySelectorAll(".collector");
  console.log("[Collector] Found " + collectors.length + " collector(s)");
  collectors.forEach((collectorEl) => {
    const collectionName =
      collectorEl.dataset.collection || collectorEl.dataset.path;
    const opts = JSON.parse(collectorEl.dataset.opts || "{}");
    console.log("[Collector] Initializing collector:", collectionName, opts);
    initializeCollector(collectorEl, collectionName, opts);
  });

  // Initialize Selection Buttons
  initializeSelectionButtons();
});

function initializeCollector(container, collectionName, opts) {
  console.log("[Collector] initializeCollector called for:", collectionName);
  let html = "";

  const searchFields = Array.isArray(opts.search_fields)
    ? opts.search_fields
    : [];

  const filterFields = Array.isArray(opts.filter_fields)
    ? opts.filter_fields
    : [];

  const sortFields = Array.isArray(opts.sort_fields) ? opts.sort_fields : [];

  const hasSearch = searchFields.length > 0;
  const hasFilters = filterFields.length > 0;
  const hasSort = sortFields.length > 0;

  const isClickable = opts.clickable !== false;
  container.classList.toggle("collector-not-clickable", !isClickable);

  if (hasSearch || hasFilters || hasSort) {
    html += `<div class="collector-controls">`;
    if (hasSearch) {
      html += `  <div class="collector-search"><input type="text" placeholder="Search items..."></div>`;
    }
    if (hasFilters) {
      html += `  <div class="collector-filters-dropdown">`;
      html += `    <button class="collector-filters-btn">Filters ▼</button>`;
      html += `    <div class="collector-filters-menu" style="display:none;" id="filter-menu-${Math.random().toString(36).substr(2, 9)}"></div>`;
      html += `  </div>`;
    }
    if (hasSort) {
      html += `  <div class="collector-sort-dropdown">`;
      html += `    <button class="collector-sort-btn">Sort</button>`;
      html += `    <div class="collector-sort-menu" style="display:none;" id="sort-menu-${Math.random().toString(36).substr(2, 9)}">`;
      html += `      <button class="sort-option" data-sort="none">None</button>`;
      sortFields.forEach((field) => {
        html += `      <button class="sort-option" data-sort="${escapeHtml(field)}">${escapeHtml(labelizeField(field))}</button>`;
      });
      html += `    </div>`;
      html += `  </div>`;
    }
    html += `</div>`;
  }

  html += `<div class="collector-items arrange-${opts.arrange || "cols"}"></div>`;
  container.innerHTML = html;

  const items = getCollectorItems(collectionName);
  console.log(
    "[Collector] Got " + items.length + " items for collection:",
    collectionName,
  );
  console.log("[Collector] Items:", items);

  console.log("[Collector] Rendering items, opts:", opts);

  // Precompute search text for this collector
  items.forEach((item) => {
    item._searchText = buildSearchText(item, searchFields);
  });

  // Initialize sort state
  const sortState = {
    field: "none",
    reverse: false,
  };

  renderCollectorItems(container, items, opts, sortState);

  if (hasSearch || hasFilters) {
    const searchInput = hasSearch
      ? container.querySelector(".collector-search input")
      : null;
    const filterBtn = hasFilters
      ? container.querySelector(".collector-filters-btn")
      : null;
    const filterMenu = hasFilters
      ? container.querySelector(".collector-filters-menu")
      : null;

    if (hasFilters && filterMenu) {
      const filterHtml = buildFilterMenu(items, filterFields);
      filterMenu.innerHTML =
        filterHtml ||
        '<div class="collector-filter-empty">No filters available.</div>';

      filterMenu
        .querySelectorAll('input[type="checkbox"]')
        .forEach((checkbox) => {
          checkbox.addEventListener("change", () => {
            filterItems(
              container,
              items,
              opts,
              sortState,
              searchFields,
              filterFields,
            );
          });
        });

      filterBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        const isOpen = filterMenu.style.display !== "none";
        filterMenu.style.display = isOpen ? "none" : "flex";
      });

      document.addEventListener("click", function (e) {
        const dropdown = container.querySelector(".collector-filters-dropdown");
        if (dropdown && !dropdown.contains(e.target)) {
          filterMenu.style.display = "none";
        }
      });
    }

    if (hasSearch && searchInput) {
      searchInput.addEventListener("input", () =>
        filterItems(
          container,
          items,
          opts,
          sortState,
          searchFields,
          filterFields,
        ),
      );
    }
  }

  // Setup sort functionality
  if (hasSort) {
    const sortBtn = container.querySelector(".collector-sort-btn");
    const sortMenu = container.querySelector(".collector-sort-menu");
    const sortOptions = sortMenu.querySelectorAll(".sort-option");

    sortOptions.forEach((option) => {
      option.addEventListener("click", function (e) {
        e.stopPropagation();
        const sortField = this.dataset.sort;

        // Toggle reverse if same field clicked
        if (sortState.field === sortField && sortField !== "none") {
          sortState.reverse = !sortState.reverse;
        } else {
          sortState.field = sortField;
          sortState.reverse = false;
        }

        // Update button text
        let btnText = "Sort";
        if (sortState.field !== "none") {
          const capitalize = (str) =>
            str.charAt(0).toUpperCase() + str.slice(1);
          btnText = capitalize(sortState.field);
          if (sortState.reverse) {
            btnText += " ↓";
          } else {
            btnText += " ↑";
          }
        }
        sortBtn.textContent = btnText;

        // Re-render items with new sort
        filterItems(
          container,
          items,
          opts,
          sortState,
          searchFields,
          filterFields,
        );
        sortMenu.style.display = "none";
      });
    });

    sortBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = sortMenu.style.display !== "none";
      sortMenu.style.display = isOpen ? "none" : "flex";
    });

    document.addEventListener("click", function (e) {
      const dropdown = container.querySelector(".collector-sort-dropdown");
      if (dropdown && !dropdown.contains(e.target)) {
        sortMenu.style.display = "none";
      }
    });
  }
}

function renderCollectorItems(container, items, opts, sortState) {
  const itemsContainer = container.querySelector(".collector-items");

  let displayLimit =
    opts.display_items === "all"
      ? items.length
      : parseInt(opts.display_items) || items.length;

  let visibleItems = items.slice(0, displayLimit);

  // Apply sorting
  if (sortState && sortState.field !== "none") {
    visibleItems = sortItems(visibleItems, sortState);
  }

  if (visibleItems.length === 0) {
    itemsContainer.innerHTML =
      '<div class="collector-empty">No items found.</div>';
    return;
  }

  let html = "";
  visibleItems.forEach((item) => {
    const searchable =
      item._searchText ||
      item.searchable ||
      `${item.title || ""} ${item.description || ""}`.toLowerCase();
    const tagsJson = JSON.stringify(item.tags || []);
    const url = item.pageUrl || item.url || "#";

    html += `<div class="collector-item" data-searchable="${escapeAttr(searchable)}" data-tags='${escapeAttr(tagsJson)}' data-url="${escapeAttr(url)}">`;
    html += item.cardHtml || renderFallbackCard(item, opts);
    html += `</div>`;
  });

  itemsContainer.innerHTML = html;

  itemsContainer.querySelectorAll(".collector-item").forEach((itemEl) => {
    itemEl.addEventListener("click", function (e) {
      if (container.classList.contains("collector-not-clickable")) return;
      if (e.target.closest("a, button, input, textarea, select")) return;
      const url = this.dataset.url;
      if (url && url !== "#") {
        window.location.href = url;
      }
    });
  });
}

function sortItems(items, sortState) {
  const sorted = [...items]; // Create a copy to avoid mutating original

  if (!sortState || sortState.field === "none") return sorted;

  const field = sortState.field;

  sorted.sort((a, b) => {
    const valueA = getSortValue(a, field);
    const valueB = getSortValue(b, field);

    const compareResult = compareValues(valueA, valueB);
    return sortState.reverse ? -compareResult : compareResult;
  });

  return sorted;
}

function filterItems(
  container,
  items,
  opts,
  sortState,
  searchFields,
  filterFields,
) {
  const searchInput = container.querySelector(".collector-search input");
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";

  const filterMenu = container.querySelector(".collector-filters-menu");

  const selectedFilters = {};
  if (filterFields && filterFields.length > 0 && filterMenu) {
    filterMenu
      .querySelectorAll('input[type="checkbox"][data-field]:checked')
      .forEach((checkbox) => {
        const field = checkbox.dataset.field;
        const value = checkbox.dataset.value;
        if (!selectedFilters[field]) {
          selectedFilters[field] = new Set();
        }
        selectedFilters[field].add(value.toLowerCase());
      });
  }

  const itemsContainer = container.querySelector(".collector-items");

  let visibleItems = items.filter((item) => {
    const searchableText =
      item._searchText ||
      buildSearchText(item, searchFields) ||
      `${item.title || ""} ${item.description || ""}`.toLowerCase();
    const matchesSearch = !searchTerm || searchableText.includes(searchTerm);

    const matchesFilters =
      filterFields && filterFields.length > 0
        ? filterFields.every((field) => {
            const selectedSet = selectedFilters[field];
            if (!selectedSet || selectedSet.size === 0) return true;
            const values = getFieldValues(item, field).map((v) =>
              v.toLowerCase(),
            );
            return values.some((value) => selectedSet.has(value));
          })
        : true;

    return matchesSearch && matchesFilters;
  });

  let displayLimit =
    opts.display_items === "all"
      ? items.length
      : parseInt(opts.display_items) || items.length;
  visibleItems = visibleItems.slice(0, displayLimit);

  // Apply sorting to filtered items
  if (sortState && sortState.field !== "none") {
    visibleItems = sortItems(visibleItems, sortState);
  }

  if (visibleItems.length === 0) {
    itemsContainer.innerHTML =
      '<div class="collector-empty">No items match your filters.</div>';
    return;
  }

  let html = "";
  visibleItems.forEach((item) => {
    const searchable =
      item._searchText ||
      `${item.title || ""} ${item.description || ""}`.toLowerCase();
    const tagsJson = JSON.stringify(item.tags || []);
    const url = item.pageUrl || item.url || "#";

    html += `<div class="collector-item" data-searchable="${escapeAttr(searchable)}" data-tags='${escapeAttr(tagsJson)}' data-url="${escapeAttr(url)}">`;
    html += item.cardHtml || renderFallbackCard(item, opts);
    html += `</div>`;
  });

  itemsContainer.innerHTML = html;

  itemsContainer.querySelectorAll(".collector-item").forEach((itemEl) => {
    itemEl.addEventListener("click", function (e) {
      if (container.classList.contains("collector-not-clickable")) return;
      if (e.target.closest("a, button, input, textarea, select")) return;
      const url = this.dataset.url;
      if (url && url !== "#") {
        window.location.href = url;
      }
    });
  });
}

function buildSearchText(item, searchFields) {
  if (!Array.isArray(searchFields) || searchFields.length === 0) return "";

  const parts = [];
  searchFields.forEach((field) => {
    const values = getFieldValues(item, field);
    values.forEach((value) => {
      if (value && value.trim().length > 0) {
        parts.push(value.trim());
      }
    });
  });

  return parts.join(" ").toLowerCase();
}

function buildFilterMenu(items, filterFields) {
  const fieldValues = {};

  filterFields.forEach((field) => {
    fieldValues[field] = new Set();
  });

  items.forEach((item) => {
    filterFields.forEach((field) => {
      const values = getFieldValues(item, field);
      values.forEach((value) => {
        if (value && value.trim().length > 0) {
          fieldValues[field].add(value.trim());
        }
      });
    });
  });

  let html = "";
  filterFields.forEach((field) => {
    const values = Array.from(fieldValues[field]).sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" }),
    );

    if (values.length === 0) return;

    html += `<div class="collector-filter-group">`;
    html += `  <div class="collector-filter-title">${escapeHtml(labelizeField(field))}</div>`;
    values.forEach((value) => {
      const inputId = `filter-${field.replace(/\s+/g, "-")}-${value.replace(/\s+/g, "-")}-${Math.random()}`;
      html += `  <label class="collector-filter-option"><input type="checkbox" data-field="${escapeAttr(field)}" data-value="${escapeAttr(value)}" id="${escapeAttr(inputId)}"> ${escapeHtml(value)}</label>`;
    });
    html += `</div>`;
  });

  return html;
}

function getFieldValues(item, field) {
  const source = item && item.data ? item.data : item;
  const rawValue = getFieldValue(source, field);

  if (rawValue !== undefined && rawValue !== null) {
    return normalizeValue(rawValue);
  }

  return normalizeValue(getFieldValue(item, field));
}

function getFieldValue(obj, fieldPath) {
  if (!obj || !fieldPath) return undefined;
  return fieldPath.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return acc[key];
    }
    return undefined;
  }, obj);
}

function normalizeValue(value) {
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) {
    return value.flatMap(normalizeValue);
  }
  if (typeof value === "object") {
    if ("name" in value) return [String(value.name)];
    if ("title" in value) return [String(value.title)];
    return [JSON.stringify(value)];
  }
  return [String(value)];
}

function labelizeField(field) {
  return field
    .replace(/[_-]+/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getSortValue(item, field) {
  const values = getFieldValues(item, field);
  const rawValue = values.length > 0 ? values[0] : "";

  const fieldLower = String(field || "").toLowerCase();
  const dateCandidate = new Date(rawValue);
  if (fieldLower.includes("date") && !Number.isNaN(dateCandidate.getTime())) {
    return { type: "date", value: dateCandidate.getTime() };
  }

  const numericValue = Number(rawValue);
  if (!Number.isNaN(numericValue) && String(rawValue).trim() !== "") {
    return { type: "number", value: numericValue };
  }

  return { type: "string", value: String(rawValue).toLowerCase() };
}

function compareValues(a, b) {
  if (!a || !b) return 0;
  if (a.type === "date" && b.type === "date") {
    return a.value - b.value;
  }
  if (a.type === "number" && b.type === "number") {
    return a.value - b.value;
  }
  return String(a.value).localeCompare(String(b.value), undefined, {
    sensitivity: "base",
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function renderFallbackCard(item, opts) {
  let html = "";
  html += `<h3>${escapeHtml(item.title || "Untitled")}</h3>`;
  if (item.description) {
    html += `  <p class="collector-item-description">${escapeHtml(item.description)}</p>`;
  }

  const hasMeta =
    (opts.date && item.date) ||
    (opts.tags && item.tags && item.tags.length > 0);
  if (hasMeta) {
    html += `  <div class="collector-item-meta">`;
    if (opts.date && item.date) {
      html += `    <span class="collector-item-date">${formatDate(item.date)}</span>`;
    }
    if (opts.tags && item.tags && item.tags.length > 0) {
      html += `    <div class="collector-item-tags">`;
      item.tags.forEach((tag) => {
        html += `      <span class="tag">${escapeHtml(tag)}</span>`;
      });
      html += `    </div>`;
    }
    html += `  </div>`;
  }

  return html;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getCollectorItems(collectionName) {
  if (
    typeof window.collectorData !== "undefined" &&
    window.collectorData[collectionName]
  ) {
    return window.collectorData[collectionName];
  }

  console.warn("[Collector] Data not found for collection:", collectionName);
  return [];
}

/**
 * Selection Button Toggle Functionality
 */
function initializeSelectionButtons() {
  const sbtnButtons = document.querySelectorAll(".sbtn");
  sbtnButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const targetId = this.dataset.target;
      const menu = document.getElementById(targetId);
      if (menu) {
        const isOpen = menu.style.display === "flex";

        // Close all other menus first
        closeAllSbtnMenus();

        // Toggle this menu
        if (!isOpen) {
          menu.style.display = "flex";
          this.classList.add("open");
        }
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".sbtn-container")) {
      closeAllSbtnMenus();
    }
  });
}

function closeAllSbtnMenus() {
  const menus = document.querySelectorAll(".sbtn-menu");
  const buttons = document.querySelectorAll(".sbtn");
  menus.forEach((menu) => {
    menu.style.display = "none";
  });
  buttons.forEach((button) => {
    button.classList.remove("open");
  });
}

/**
 * Navigation Dropdown Toggle Functionality
 */
function initializeNavDropdowns() {
  const dropdownBtns = document.querySelectorAll(".nav-dropdown-btn");

  dropdownBtns.forEach((btn) => {
    // Add mouseenter event for hover behavior
    btn.addEventListener("mouseenter", function (e) {
      const targetId = this.dataset.target;
      const menu = document.getElementById(targetId);

      if (menu) {
        // Close all other dropdowns
        closeAllNavDropdowns();

        // Open this dropdown
        menu.classList.add("open");
        this.setAttribute("aria-expanded", "true");
      }
    });

    // Add mouseleave event to close dropdown when hover stops
    let hoverTimeout;

    btn.addEventListener("mouseleave", function (e) {
      const targetId = this.dataset.target;
      const menu = document.getElementById(targetId);

      if (menu) {
        // Set a timeout to close the dropdown after a short delay
        hoverTimeout = setTimeout(() => {
          menu.classList.remove("open");
          this.setAttribute("aria-expanded", "false");
        }, 33); // delay
      }
    });

    // Add mouseenter to clear the timeout if mouse re-enters
    btn.addEventListener("mouseenter", function (e) {
      // Clear any pending timeout
      clearTimeout(hoverTimeout);

      const targetId = this.dataset.target;
      const menu = document.getElementById(targetId);

      if (menu) {
        // Close all other dropdowns
        closeAllNavDropdowns();

        // Open this dropdown
        menu.classList.add("open");
        this.setAttribute("aria-expanded", "true");
      }
    });

    // Add mouseenter to menu to clear timeout when hovering over menu
    const menu = document.getElementById(btn.dataset.target);
    if (menu) {
      menu.addEventListener("mouseenter", function () {
        clearTimeout(hoverTimeout);
      });

      menu.addEventListener("mouseleave", function () {
        // Set timeout to close when mouse leaves menu
        hoverTimeout = setTimeout(() => {
          this.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
        }, 300);
      });
    }

    // Keep click behavior for accessibility
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const targetId = this.dataset.target;
      const menu = document.getElementById(targetId);
      const nav = document.querySelector("nav");

      if (menu) {
        const isOpen = menu.classList.contains("open");

        // Close all other dropdowns
        closeAllNavDropdowns();

        // Toggle this dropdown
        if (!isOpen) {
          menu.classList.add("open");
          this.setAttribute("aria-expanded", "true");
        } else {
          menu.classList.remove("open");
          this.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // Close dropdowns when clicking menu items
  const dropdownItems = document.querySelectorAll(".nav-dropdown-item");
  dropdownItems.forEach((item) => {
    // Add hover effect
    item.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "var(--accent-pale)";
      this.style.color = "var(--accent-dark)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
      this.style.color = "";
    });

    item.addEventListener("click", function () {
      closeAllNavDropdowns();
      // Close mobile nav if open
      const nav = document.querySelector("nav");
      if (nav) {
        nav.classList.remove("open");
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-dropdown-container")) {
      closeAllNavDropdowns();
    }
  });
}

function closeAllNavDropdowns() {
  const menus = document.querySelectorAll(".nav-dropdown-menu");
  const btns = document.querySelectorAll(".nav-dropdown-btn");
  menus.forEach((menu) => {
    menu.classList.remove("open");
  });
  btns.forEach((btn) => {
    btn.setAttribute("aria-expanded", "false");
  });
}
