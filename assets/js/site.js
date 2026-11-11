/**
 * Site behaviour (the only script on the site; loaded with `defer`).
 *  1. Tabs        [data-tab] buttons show the matching #tab-<name> panel.
 *  2. Tab links   [data-goto] links switch tab and scroll to the tab bar;
 *                 /#tab-<name> in the URL opens that tab on load.
 *  3. Copy link   [data-copy] buttons copy their URL to the clipboard.
 *  4. Externals   links to other sites open in a new tab (noopener).
 *  5. Pagination  .paged[data-page-size] shows its article.row children N at a
 *                 time; h3.sub headings are hidden when none of their rows show.
 */
(() => {
  "use strict";

  // 1–2. Tabs
  const tabButtons = document.querySelectorAll("[data-tab]");
  const tabBar = document.querySelector(".tabs");

  const showTab = (name) => {
    tabButtons.forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === name)));
    document.querySelectorAll(".tab").forEach((panel) => { panel.hidden = panel.id !== `tab-${name}`; });
  };

  tabButtons.forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));

  const fromHash = location.hash.match(/^#tab-([\w-]+)$/);
  if (fromHash && document.getElementById(`tab-${fromHash[1]}`)) showTab(fromHash[1]);

  document.querySelectorAll("[data-goto]").forEach((a) => a.addEventListener("click", (e) => {
    if (!tabBar) return;               // not on the home page: follow the href
    e.preventDefault();
    showTab(a.dataset.goto);
    tabBar.scrollIntoView({ behavior: "smooth", block: "start" });
  }));

  // 3. Copy link
  document.querySelectorAll("[data-copy]").forEach((b) => b.addEventListener("click", async () => {
    const label = b.textContent;
    try {
      await navigator.clipboard.writeText(b.dataset.copy);
      b.textContent = "Copied";
    } catch {
      b.textContent = "Copy failed";
    }
    setTimeout(() => { b.textContent = label; }, 1500);
  }));

  // 4. External links
  document.querySelectorAll("a[href^='http']").forEach((a) => {
    if (a.host !== location.host) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
  });

  // 5. Pagination
  document.querySelectorAll(".paged[data-page-size]").forEach((box) => {
    const size = Number(box.dataset.pageSize);
    const rows = [...box.querySelectorAll(":scope > article.row")];
    const heads = [...box.querySelectorAll(":scope > h3")];
    const pages = Math.ceil(rows.length / size);
    if (pages < 2) return;

    const nav = document.createElement("nav");
    nav.className = "pager";
    nav.setAttribute("aria-label", "Pages");
    box.after(nav);

    const button = (label, page, opts = {}) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      if (opts.current) b.setAttribute("aria-current", "page");
      if (opts.disabled) b.disabled = true;
      if (opts.label) b.setAttribute("aria-label", opts.label);
      b.addEventListener("click", () => { show(page); (tabBar || box).scrollIntoView({ behavior: "smooth", block: "start" }); });
      return b;
    };

    const show = (page) => {
      rows.forEach((r, i) => { r.hidden = Math.floor(i / size) !== page; });
      heads.forEach((h) => {
        let n = h.nextElementSibling, visible = false;
        while (n && n.tagName !== "H3") { if (n.matches("article.row") && !n.hidden) { visible = true; break; } n = n.nextElementSibling; }
        h.hidden = !visible;
      });
      nav.replaceChildren(
        button("‹", page - 1, { disabled: page === 0, label: "Previous page" }),
        ...Array.from({ length: pages }, (_, p) => button(String(p + 1), p, { current: p === page })),
        button("›", page + 1, { disabled: page === pages - 1, label: "Next page" }),
      );
    };
    show(0);
  });
})();
