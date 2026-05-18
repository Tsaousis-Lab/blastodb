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

  const collectors = document.querySelectorAll(".collector");
  console.log("[Collector] Found " + collectors.length + " collector(s)");
  collectors.forEach((collectorEl) => {
    const path = collectorEl.dataset.path;
    const opts = JSON.parse(collectorEl.dataset.opts || "{}");
    console.log("[Collector] Initializing collector:", path, opts);
    initializeCollector(collectorEl, path, opts);
  });
});

function initializeCollector(container, path, opts) {
  console.log("[Collector] initializeCollector called for:", path);
  let html = "";

  const hasSearch = opts.search !== false;
  const hasTags = opts.tags !== false;
  const hasDate = opts.date !== false;

  if (hasSearch || hasTags) {
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
    html += `</div>`;
  }

  html += `<div class="collector-items arrange-${opts.arrange || "cols"}"></div>`;
  container.innerHTML = html;

  const items = getCollectorItems(path);
  console.log("[Collector] Got " + items.length + " items for path:", path);
  console.log("[Collector] Items:", items);

  console.log("[Collector] Rendering items, opts:", opts);
  renderCollectorItems(container, items, opts);

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
          filterItems(container, items, opts);
        });

        tagCheckboxes.forEach((checkbox) => {
          checkbox.addEventListener("change", () => {
            const allChecked = Array.from(tagCheckboxes).every(
              (cb) => cb.checked,
            );
            allCheckbox.checked = allChecked;
            filterItems(container, items, opts);
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
        if (!dropdown.contains(e.target)) {
          filterMenu.style.display = "none";
        }
      });
    }

    if (hasSearch && searchInput) {
      searchInput.addEventListener("input", () =>
        filterItems(container, items, opts),
      );
    }
  }
}

function renderCollectorItems(container, items, opts) {
  const itemsContainer = container.querySelector(".collector-items");

  let displayLimit =
    opts.display_items === "all"
      ? items.length
      : parseInt(opts.display_items) || items.length;

  let visibleItems = items.slice(0, displayLimit);

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

function filterItems(container, items, opts) {
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
