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

    // Close menu when a link is clicked
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  // ── Collector Component ────────────────
  // Initialize collectors
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
  // Build the collector HTML structure
  let html = "";

  // Controls section
  const hasSearch = opts.search !== false;
  const hasTags = opts.tags !== false;
  const hasDate = opts.date !== false;

  if (hasSearch) {
    html += `<div class="collector-controls">`;
    html += `  <div class="collector-search"><input type="text" placeholder="Search items..."></div>`;
    html += `  <div class="collector-filters-dropdown">`;
    html += `    <button class="collector-filters-btn">Filters ▼</button>`;
    html += `    <div class="collector-filters-menu" style="display:none;" id="tag-filter-${Math.random().toString(36).substr(2, 9)}"></div>`;
    html += `  </div>`;
    html += `</div>`;
  }

  html += `<div class="collector-items arrange-${opts.arrange || "cols"}"></div>`;
  container.innerHTML = html;

  // Get items data (hardcoded for now, would come from filesystem in real implementation)
  const items = getCollectorItems(path);
  console.log("[Collector] Got " + items.length + " items for path:", path);
  console.log("[Collector] Items:", items);

  // Render items
  console.log("[Collector] Rendering items, opts:", opts);
  renderCollectorItems(container, items, opts);

  // Setup event listeners
  if (hasSearch) {
    const searchInput = container.querySelector(".collector-search input");
    const filterBtn = container.querySelector(".collector-filters-btn");
    const filterMenu = container.querySelector(".collector-filters-menu");

    // Build tag filter
    const allTags = new Set();
    items.forEach((item) => {
      if (item.tags && Array.isArray(item.tags)) {
        item.tags.forEach((tag) => allTags.add(tag));
      }
    });

    if (allTags.size > 0) {
      let tagHtml = "";
      allTags.forEach((tag) => {
        const tagId = `tag-${tag.replace(/\s+/g, "-").toLowerCase()}-${Math.random()}`;
        tagHtml += `<label><input type="checkbox" data-tag="${tag}" id="${tagId}"> ${tag}</label>`;
      });
      filterMenu.innerHTML = tagHtml;

      // Add tag filter listeners
      filterMenu
        .querySelectorAll('input[type="checkbox"]')
        .forEach((checkbox) => {
          checkbox.addEventListener("change", () =>
            filterItems(container, items, opts),
          );
        });
    }

    // Add dropdown toggle listener
    filterBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = filterMenu.style.display !== "none";
      filterMenu.style.display = isOpen ? "none" : "flex";
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      const dropdown = container.querySelector(".collector-filters-dropdown");
      if (!dropdown.contains(e.target)) {
        filterMenu.style.display = "none";
      }
    });

    // Add search listener
    searchInput.addEventListener("input", () =>
      filterItems(container, items, opts),
    );
  }
}

function renderCollectorItems(container, items, opts) {
  const itemsContainer = container.querySelector(".collector-items");

  // Parse display_items option
  let displayLimit =
    opts.display_items === "all"
      ? items.length
      : parseInt(opts.display_items) || items.length;

  // Filter and limit items
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

  // Add click event listeners to items
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
  const searchTerm = searchInput.value.toLowerCase();

  // Get selected tags
  const filterMenu = container.querySelector(".collector-filters-menu");
  const selectedTags = Array.from(
    filterMenu.querySelectorAll('input[type="checkbox"]:checked'),
  ).map((checkbox) => checkbox.dataset.tag);

  const itemsContainer = container.querySelector(".collector-items");
  let visibleItems = items.filter((item) => {
    // Search filter
    const matchesSearch =
      !searchTerm ||
      item.title.toLowerCase().includes(searchTerm) ||
      (item.description && item.description.toLowerCase().includes(searchTerm));

    // Tag filter
    const matchesTags =
      selectedTags.length === 0 ||
      (item.tags && item.tags.some((tag) => selectedTags.includes(tag)));

    return matchesSearch && matchesTags;
  });

  // Limit display items
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

  // Add click event listeners to filtered items
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
  // Fetch items from the global labProtocols data that's injected into the page
  // This is populated at build time from the content/lab-protocols folder

  if (path === "lab-protocols") {
    // Get protocols from global variable (injected by 11ty)
    if (typeof window.labProtocols !== "undefined") {
      return window.labProtocols.map((protocol) => ({
        title: protocol.title,
        description: protocol.shortDescription || protocol.description,
        tags: protocol.tags,
        date: protocol.date,
        url: protocol.url,
      }));
    }

    // Fallback if not injected - return empty array
    console.warn("[Collector] Lab protocols not found in global data");
    return [];
  }

  return [];
}
