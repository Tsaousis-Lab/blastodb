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

  // Initialize the contact form (mailto)
  initializeContactForm();
});

/**
 * Contact form: builds a pre-filled mailto: link from the fields and opens the
 * visitor's mail client. The site is static, so there is no server to POST to —
 * the message is sent from the visitor's own email account.
 */
function initializeContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const to = form.dataset.mailto;
    const subject =
      (form.elements.subject.value || "").trim() || "BlastoDB contact";
    const message = (form.elements.message.value || "").trim();

    window.location.href = `mailto:${to}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(message)}`;
  });
}

function initializeCollector(container, collectionName, opts) {
  console.log("[Collector] initializeCollector called for:", collectionName);
  let html = "";

  const searchFields = Array.isArray(opts.search_fields)
    ? opts.search_fields
    : [];

  const filterGroups = normalizeFilterGroups(opts.filters);

  const sortFields = Array.isArray(opts.sort_fields) ? opts.sort_fields : [];

  const hasSearch = searchFields.length > 0;
  const hasFilters = filterGroups.length > 0;
  const hasSort = sortFields.length > 0;

  const isClickable = opts.clickable !== false;
  container.classList.toggle("collector-not-clickable", !isClickable);

  if (hasSearch || hasFilters || hasSort) {
    html += `<div class="collector-controls">`;
    if (hasSearch) {
      html += `  <div class="collector-search"><input type="text" placeholder="Search items..."></div>`;
    }
    if (hasFilters) {
      html += `  <div class="collector-filters-group">`;
      filterGroups.forEach((group, index) => {
        html += `    <div class="collector-filters-dropdown" data-filter-index="${index}">`;
        html += `      <button class="collector-filters-btn">${escapeHtml(group.label)} <span class="collector-filters-arrow">▼</span></button>`;
        html += `      <div class="collector-filters-menu" style="display:none;" data-filter-index="${index}"></div>`;
        html += `    </div>`;
      });
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

  const allItems = getCollectorItems(
    collectionName,
    opts.card_template || null,
  );
  console.log(
    "[Collector] Got " + allItems.length + " items for collection:",
    collectionName,
  );

  // Apply pre-filter to narrow the base item set before search/filters/sort
  const prefilter = opts.prefilter || null;
  const items = prefilter
    ? allItems.filter((item) => matchesPrefilter(item, prefilter))
    : allItems;

  if (prefilter) {
    console.log(
      "[Collector] Pre-filter reduced items from " +
        allItems.length +
        " to " +
        items.length,
    );
  }

  console.log("[Collector] Rendering items, opts:", opts);

  // Precompute search text for this collector
  items.forEach((item) => {
    item._searchText = buildSearchText(item, searchFields);
  });

  // Initialize sort state
  const sortState = {
    field: "none",
    reverse: false,
    numeric: true,
  };

  renderCollectorItems(container, items, opts, sortState);

  if (hasSearch || hasFilters) {
    const searchInput = hasSearch
      ? container.querySelector(".collector-search input")
      : null;

    if (hasFilters) {
      renderFilterMenus(container, items, filterGroups, searchFields, "");
      attachFilterMenuHandlers(
        container,
        items,
        opts,
        sortState,
        searchFields,
        filterGroups,
      );
    }

    if (hasSearch && searchInput) {
      searchInput.addEventListener("input", () =>
        filterItems(
          container,
          items,
          opts,
          sortState,
          searchFields,
          filterGroups,
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
          filterGroups,
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
  filterGroups,
) {
  const searchInput = container.querySelector(".collector-search input");
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";

  const itemsContainer = container.querySelector(".collector-items");
  const selections = getFilterSelections(container, filterGroups);

  let visibleItems = items.filter((item) => {
    const searchableText =
      item._searchText ||
      buildSearchText(item, searchFields) ||
      `${item.title || ""} ${item.description || ""}`.toLowerCase();
    const matchesSearch = !searchTerm || searchableText.includes(searchTerm);

    const matchesFilters = matchesFilterGroups(item, filterGroups, selections);

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
  } else {
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
        if (e.target.closest("a, button, input, textarea, select, summary"))
          return;
        const url = this.dataset.url;
        if (url && url !== "#") {
          window.location.href = url;
        }
      });
    });
  }

  if (filterGroups && filterGroups.length > 0) {
    renderFilterMenus(container, items, filterGroups, searchFields, searchTerm);
    attachFilterMenuHandlers(
      container,
      items,
      opts,
      sortState,
      searchFields,
      filterGroups,
    );
  }
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

function normalizeFilterGroups(filters) {
  if (!Array.isArray(filters)) return [];
  return filters
    .map((group) => {
      const label =
        group && typeof group.label === "string" ? group.label : "Filters";
      const fields = Array.isArray(group && group.fields) ? group.fields : [];
      return { label, fields };
    })
    .filter((group) => group.fields.length > 0);
}

function renderFilterMenus(
  container,
  items,
  filterGroups,
  searchFields,
  searchTerm,
) {
  const selections = getFilterSelections(container, filterGroups);

  filterGroups.forEach((group, index) => {
    const menu = container.querySelector(
      `.collector-filters-menu[data-filter-index="${index}"]`,
    );
    if (!menu) return;

    const availableMap = getAvailableValuesForGroup(
      items,
      group,
      filterGroups,
      selections,
      index,
      searchFields,
      searchTerm,
    );

    const selected = selections[index] || { raw: [], keys: new Set() };
    selected.raw.forEach((value) => {
      const key = value.toLowerCase();
      if (!availableMap.has(key)) {
        availableMap.set(key, value);
      }
    });

    const sorted = Array.from(availableMap.entries()).sort((a, b) =>
      a[1].localeCompare(b[1], undefined, {
        sensitivity: "base",
        numeric: true,
      }),
    );

    if (sorted.length === 0) {
      menu.innerHTML =
        '<div class="collector-filter-empty">No filters available.</div>';
      return;
    }

    let html = "";
    sorted.forEach(([key, label]) => {
      const inputId = `filter-${index}-${label.replace(/\s+/g, "-")}-${Math.random()}`;
      const checked = selected.keys && selected.keys.has(key);
      html += `  <label class="collector-filter-option"><input type="checkbox" data-filter-index="${index}" data-value="${escapeAttr(label)}" id="${escapeAttr(inputId)}" ${checked ? "checked" : ""}> ${escapeHtml(label)}</label>`;
    });

    menu.innerHTML = html;
  });
}

function attachFilterMenuHandlers(
  container,
  items,
  opts,
  sortState,
  searchFields,
  filterGroups,
) {
  const dropdowns = container.querySelectorAll(".collector-filters-dropdown");

  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".collector-filters-btn");
    const menu = dropdown.querySelector(".collector-filters-menu");
    if (!btn || !menu) return;

    btn.onclick = (e) => {
      e.stopPropagation();
      const isOpen = menu.style.display !== "none";
      closeAllFilterMenus(container);
      if (isOpen) {
        menu.style.display = "none";
        dropdown.classList.remove("is-open");
        return;
      }

      menu.style.display = "flex";
      dropdown.classList.add("is-open");
      adjustFilterMenuPosition(menu);
    };

    menu.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.onchange = () => {
        filterItems(
          container,
          items,
          opts,
          sortState,
          searchFields,
          filterGroups,
        );
      };
    });
  });

  if (!container.dataset.filtersOutsideHandler) {
    document.addEventListener("click", (event) => {
      if (!container.contains(event.target)) {
        closeAllFilterMenus(container);
      }
    });
    container.dataset.filtersOutsideHandler = "true";
  }
}

function closeAllFilterMenus(container) {
  container.querySelectorAll(".collector-filters-menu").forEach((menu) => {
    menu.style.display = "none";
  });
  container
    .querySelectorAll(".collector-filters-dropdown.is-open")
    .forEach((dropdown) => dropdown.classList.remove("is-open"));
}

function adjustFilterMenuPosition(menu) {
  if (!menu) return;

  menu.style.left = "";
  menu.style.right = "";

  const rect = menu.getBoundingClientRect();
  const viewportWidth = document.documentElement.clientWidth;

  const overflowsRight = rect.right > viewportWidth;
  const overflowsLeft = rect.left < 0;

  if (overflowsRight && !overflowsLeft) {
    menu.style.right = "0";
    menu.style.left = "auto";
    return;
  }

  if (overflowsLeft && !overflowsRight) {
    menu.style.left = "0";
    menu.style.right = "auto";
    return;
  }

  if (overflowsLeft && overflowsRight) {
    menu.style.left = "0";
    menu.style.right = "0";
  }
}

function getFilterSelections(container, filterGroups) {
  const selections = {};

  filterGroups.forEach((group, index) => {
    const menu = container.querySelector(
      `.collector-filters-menu[data-filter-index="${index}"]`,
    );
    if (!menu) {
      selections[index] = { raw: [], keys: new Set() };
      return;
    }

    const values = Array.from(
      menu.querySelectorAll('input[type="checkbox"]:checked'),
    ).map((checkbox) => checkbox.dataset.value);

    selections[index] = {
      raw: values,
      keys: new Set(values.map((value) => value.toLowerCase())),
    };
  });

  return selections;
}

/**
 * Evaluates a pre-filter (parsed from the prefilter:[...] shortcode parameter)
 * against a single item.  The structure is Disjunctive Normal Form:
 *   orGroups: [ andGroup1, andGroup2, ... ]
 * where each andGroup is an array of { field, value } conditions.
 * An item passes when ANY orGroup matches, and an orGroup matches when ALL
 * of its conditions match (AND-semantics).
 */
function matchesPrefilter(item, prefilter) {
  if (!prefilter || !prefilter.orGroups || prefilter.orGroups.length === 0) {
    return true;
  }

  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  return prefilter.orGroups.some((andGroup) =>
    andGroup.every((condition) => {
      if (condition.operator === "exists") {
        return getFieldValues(item, condition.field).some(
          (v) => v !== undefined && v !== null && String(v).trim() !== "",
        );
      }
      if (condition.operator === "date_gte_today" || condition.operator === "date_lte_today") {
        return getFieldValues(item, condition.field).some((v) => {
          const ddmmyyyy = String(v).match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
          const d = ddmmyyyy
            ? new Date(Number(ddmmyyyy[3]), Number(ddmmyyyy[2]) - 1, Number(ddmmyyyy[1]))
            : new Date(v);
          if (isNaN(d.getTime())) return false;
          return condition.operator === "date_gte_today"
            ? d >= todayMidnight
            : d <= todayMidnight;
        });
      }
      const fieldValues = getFieldValues(item, condition.field).map((v) =>
        typeof v === "string" ? v.toLowerCase() : String(v).toLowerCase(),
      );
      return fieldValues.includes(condition.value.toLowerCase());
    }),
  );
}

function matchesFilterGroups(item, filterGroups, selections, excludeIndex) {
  if (!filterGroups || filterGroups.length === 0) return true;

  return filterGroups.every((group, index) => {
    if (index === excludeIndex) return true;

    const selected = selections[index];
    if (!selected || selected.keys.size === 0) return true;

    return group.fields.some((field) => {
      const values = getFieldValues(item, field).map((v) => v.toLowerCase());
      return values.some((value) => selected.keys.has(value));
    });
  });
}

function getAvailableValuesForGroup(
  items,
  group,
  filterGroups,
  selections,
  index,
  searchFields,
  searchTerm,
) {
  const available = new Map();

  items
    .filter((item) => {
      const searchableText =
        item._searchText ||
        buildSearchText(item, searchFields) ||
        `${item.title || ""} ${item.description || ""}`.toLowerCase();
      const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
      if (!matchesSearch) return false;
      return matchesFilterGroups(item, filterGroups, selections, index);
    })
    .forEach((item) => {
      group.fields.forEach((field) => {
        const values = getFieldValues(item, field);
        values.forEach((value) => {
          const label = value && value.trim();
          if (!label) return;
          const key = label.toLowerCase();
          if (!available.has(key)) {
            available.set(key, label);
          }
        });
      });
    });

  return available;
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
    numeric: true,
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

function getCollectorItems(collectionName, templateName) {
  if (typeof window.collectorData !== "undefined") {
    // Prefer the template-specific variant when a card-template: override is set.
    if (templateName) {
      const key = `${collectionName}::${templateName}`;
      if (window.collectorData[key]) return window.collectorData[key];
      console.warn(
        `[Collector] No pre-rendered data for "${key}", falling back to default.`,
      );
    }
    if (window.collectorData[collectionName]) {
      return window.collectorData[collectionName];
    }
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
