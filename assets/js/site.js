/**
 * Site behaviour (the only script on the site; loaded with `defer`).
 *  1. Tabs        [data-tab] buttons show the matching #tab-<name> panel.
 *  2. Tab links   [data-goto] links switch tab and scroll to the tab bar;
 *                 /#tab-<name> in the URL opens that tab on load.
 *  3. Copy link   [data-copy] buttons copy their URL to the clipboard.
 *  4. Externals   links to other sites open in a new tab (noopener).
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
})();
