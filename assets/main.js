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
    const path = collectorEl.dataset.path;
    const opts = JSON.parse(collectorEl.dataset.opts || "{}");
    console.log("[Collector] Initializing collector:", path, opts);
    initializeCollector(collectorEl, path, opts);
  });

  // Initialize Selection Buttons
  initializeSelectionButtons();
});

function initializeCollector(container, path, opts) {
  console.log("[Collector] initializeCollector called for:", path);
  let html = "";

  const hasSearch = opts.search !== false;
  const hasTags = opts.tags !== false;
  const hasDate = opts.date !== false;
  const hasSort = opts.sort === true;

  if (hasSearch || hasTags || hasSort) {
    html += `<div class="collector-controls">`;
    if (hasSearch) {
      html += `  <div class="collector-search"><input type="text" placeholder="Search items..."></div>`;
    }
    if (hasTags) {
      html += `  <div class="collector-filters-dropdown">`;
      html += `    <button class="collector-filters-btn">Filters ▼</button>`;
      html += `    <div class="collector-filters-menu" style="display:none;" id="tag-filter-${Math.random().toString(36).substr(2, 9)}"></div>`;
      html += `  </div>`;
    }
    if (hasSort) {
      html += `  <div class="collector-sort-dropdown">`;
      html += `    <button class="collector-sort-btn">Sort</button>`;
      html += `    <div class="collector-sort-menu" style="display:none;" id="sort-menu-${Math.random().toString(36).substr(2, 9)}">`;
      html += `      <button class="sort-option" data-sort="none">None</button>`;
      html += `      <button class="sort-option" data-sort="title">Title</button>`;
      if (hasDate) {
        html += `      <button class="sort-option" data-sort="date">Date</button>`;
      }
      html += `    </div>`;
      html += `  </div>`;
    }
    html += `</div>`;
  }

  html += `<div class="collector-items arrange-${opts.arrange || "cols"}"></div>`;
  container.innerHTML = html;

  const items = getCollectorItems(path);
  console.log("[Collector] Got " + items.length + " items for path:", path);
  console.log("[Collector] Items:", items);

  console.log("[Collector] Rendering items, opts:", opts);

  // Initialize sort state
  const sortState = {
    field: "none",
    reverse: false,
  };

  renderCollectorItems(container, items, opts, sortState);

  if (hasSearch || hasTags) {
    const searchInput = hasSearch
      ? container.querySelector(".collector-search input")
      : null;
    const filterBtn = hasTags
      ? container.querySelector(".collector-filters-btn")
      : null;
    const filterMenu = hasTags
      ? container.querySelector(".collector-filters-menu")
      : null;

    if (hasTags && filterMenu) {
      const allTags = new Set();
      items.forEach((item) => {
        if (item.tags && Array.isArray(item.tags)) {
          item.tags.forEach((tag) => allTags.add(tag));
        }
      });

      if (allTags.size > 0) {
        let tagHtml = `<label><input type="checkbox" class="filter-all" checked> All</label>`;
        allTags.forEach((tag) => {
          const tagId = `tag-${tag.replace(/\s+/g, "-").toLowerCase()}-${Math.random()}`;
          tagHtml += `<label><input type="checkbox" data-tag="${tag}" id="${tagId}" checked> ${tag}</label>`;
        });
        filterMenu.innerHTML = tagHtml;

        const allCheckbox = filterMenu.querySelector(".filter-all");
        const tagCheckboxes = filterMenu.querySelectorAll(
          'input[type="checkbox"]:not(.filter-all)',
        );

        allCheckbox.addEventListener("change", function () {
          tagCheckboxes.forEach((checkbox) => {
            checkbox.checked = this.checked;
          });
          filterItems(container, items, opts, sortState);
        });

        tagCheckboxes.forEach((checkbox) => {
          checkbox.addEventListener("change", () => {
            const allChecked = Array.from(tagCheckboxes).every(
              (cb) => cb.checked,
            );
            allCheckbox.checked = allChecked;
            filterItems(container, items, opts, sortState);
          });
        });
      }

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
        filterItems(container, items, opts, sortState),
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
        filterItems(container, items, opts, sortState);
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
    html += `<div class="collector-item" data-searchable="${(item.title + " " + (item.description || "")).toLowerCase()}" data-tags='${JSON.stringify(item.tags || [])}' data-url="${item.url || "#"}">`;
    html += `  <h3>${item.title}</h3>`;
    if (item.description) {
      html += `  <p class="collector-item-description">${item.description}</p>`;
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
          html += `      <span class="tag">${tag}</span>`;
        });
        html += `    </div>`;
      }
      html += `  </div>`;
    }
    html += `</div>`;
  });

  itemsContainer.innerHTML = html;

  itemsContainer.querySelectorAll(".collector-item").forEach((itemEl) => {
    itemEl.addEventListener("click", function () {
      const url = this.dataset.url;
      if (url && url !== "#") {
        window.location.href = url;
      }
    });
  });
}

function sortItems(items, sortState) {
  const sorted = [...items]; // Create a copy to avoid mutating original

  if (sortState.field === "title") {
    sorted.sort((a, b) => {
      const titleA = (a.title || "").toLowerCase();
      const titleB = (b.title || "").toLowerCase();
      if (sortState.reverse) {
        return titleB.localeCompare(titleA);
      } else {
        return titleA.localeCompare(titleB);
      }
    });
  } else if (sortState.field === "date") {
    sorted.sort((a, b) => {
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();
      if (sortState.reverse) {
        return dateA - dateB; // oldest first
      } else {
        return dateB - dateA; // newest first
      }
    });
  }

  return sorted;
}

function filterItems(container, items, opts, sortState) {
  const searchInput = container.querySelector(".collector-search input");
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";

  const filterMenu = container.querySelector(".collector-filters-menu");
  const selectedTags = filterMenu
    ? Array.from(
        filterMenu.querySelectorAll(
          'input[type="checkbox"]:not(.filter-all):checked',
        ),
      ).map((checkbox) => checkbox.dataset.tag)
    : [];

  const itemsContainer = container.querySelector(".collector-items");
  let visibleItems = items.filter((item) => {
    const matchesSearch =
      !searchTerm ||
      item.title.toLowerCase().includes(searchTerm) ||
      (item.description && item.description.toLowerCase().includes(searchTerm));

    const matchesTags =
      selectedTags.length > 0 &&
      item.tags &&
      item.tags.some((tag) => selectedTags.includes(tag));

    return matchesSearch && matchesTags;
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
    html += `<div class="collector-item" data-url="${item.url || "#"}">`;
    html += `  <h3>${item.title}</h3>`;
    if (item.description) {
      html += `  <p class="collector-item-description">${item.description}</p>`;
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
          html += `      <span class="tag">${tag}</span>`;
        });
        html += `    </div>`;
      }
      html += `  </div>`;
    }
    html += `</div>`;
  });

  itemsContainer.innerHTML = html;

  itemsContainer.querySelectorAll(".collector-item").forEach((itemEl) => {
    itemEl.addEventListener("click", function () {
      const url = this.dataset.url;
      if (url && url !== "#") {
        window.location.href = url;
      }
    });
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getCollectorItems(path) {
  if (
    typeof window.collectorData !== "undefined" &&
    window.collectorData[path]
  ) {
    return window.collectorData[path];
  }

  console.warn("[Collector] Data not found for path:", path);
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
