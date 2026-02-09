/* FILE: assets/myedenday-eden-cycle-pro.js
   MyEdenDay — Eden Cycle PRO (JS) — SAFE
*/

(function () {
  function isMeaningfulRich(el) {
    if (!el) return false;
    var txt = (el.textContent || "").replace(/\u00a0/g, " ").trim();
    return txt.length > 0;
  }

  function clamp01(n) {
    if (!isFinite(n)) return 0;
    return Math.max(0, Math.min(1, n));
  }

  function initRoot(root) {
    var defaultKey = root.getAttribute("data-ed-default");
    var useRich = root.getAttribute("data-ed-use-rich") === "true";

    var titleEl = root.querySelector("[data-ed-detail-title]");
    var descEl = root.querySelector("[data-ed-detail-desc]");
    var tabsWrap = root.querySelector("[data-ed-tabs]");
    var tabBtns = Array.prototype.slice.call(root.querySelectorAll("[data-ed-tab]"));
    var cardBtns = Array.prototype.slice.call(root.querySelectorAll("[data-ed-focus]"));
    var panels = Array.prototype.slice.call(root.querySelectorAll("[data-ed-panel]"));
    var stepsToggle = root.querySelector("[data-ed-steps-toggle]");
    var faqRoot = root.querySelector("[data-ed-faq-root]");

    if (!tabsWrap || !titleEl || !descEl || panels.length === 0) return;

    function getPanelByKey(key) {
      return root.querySelector('[data-ed-panel="' + String(key) + '"]');
    }

    function setPressedCards(activeKey) {
      cardBtns.forEach(function (btn) {
        var k = btn.getAttribute("data-ed-focus");
        btn.setAttribute("aria-pressed", k === String(activeKey) ? "true" : "false");
      });
    }

    function setTabsActive(activeKey) {
      tabBtns.forEach(function (btn) {
        var k = btn.getAttribute("data-ed-tab");
        var isActive = k === String(activeKey);
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
        btn.setAttribute("tabindex", isActive ? "0" : "-1");
      });
    }

    function applyHeadFromPanel(panel) {
      var meta = panel.querySelector(".ed-panel__meta");
      if (!meta) return;

      var metaTitle = meta.querySelector("[data-ed-meta-title]");
      var metaPlain = meta.querySelector("[data-ed-meta-desc-plain]");
      var metaRich = meta.querySelector("[data-ed-meta-desc-rich]");

      if (metaTitle) titleEl.textContent = (metaTitle.textContent || "").trim();

      descEl.classList.remove("rte");

      if (useRich && isMeaningfulRich(metaRich)) {
        descEl.classList.add("rte");
        descEl.innerHTML = metaRich.innerHTML;
      } else {
        descEl.textContent = (metaPlain ? metaPlain.textContent : "") || "";
      }
    }

    function updateTabsAffordance() {
      var scrollLeft = tabsWrap.scrollLeft;
      var maxScroll = tabsWrap.scrollWidth - tabsWrap.clientWidth;

      tabsWrap.classList.toggle("ed-tabs--fade-left", scrollLeft > 2);
      tabsWrap.classList.toggle("ed-tabs--fade-right", maxScroll - scrollLeft > 2);

      var prog = maxScroll > 0 ? clamp01(scrollLeft / maxScroll) : 0;
      root.style.setProperty("--ed-tabs-progress", String(prog));
    }

    function showPanel(key) {
      var panel = getPanelByKey(key);
      if (!panel) return;

      panels.forEach(function (p) {
        var isActive = p === panel;
        if (isActive) {
          p.classList.remove("ed-hidden");
          p.removeAttribute("hidden");
        } else {
          p.classList.add("ed-hidden");
          p.setAttribute("hidden", "");
        }
      });

      setTabsActive(key);
      setPressedCards(key);
      applyHeadFromPanel(panel);
      updateTabsAffordance();
    }

    tabBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        showPanel(btn.getAttribute("data-ed-tab"));
      });
    });

    tabsWrap.addEventListener("keydown", function (e) {
      var current = document.activeElement && document.activeElement.closest("[data-ed-tab]");
      if (!current) return;

      var idx = tabBtns.indexOf(current);
      if (idx < 0) return;

      var k = e.key;
      var isArrow = k === "ArrowLeft" || k === "ArrowRight";
      var isHomeEnd = k === "Home" || k === "End";
      var isActivate = k === "Enter" || k === " ";

      if (!isArrow && !isHomeEnd && !isActivate) return;

      e.preventDefault();

      if (isActivate) {
        showPanel(current.getAttribute("data-ed-tab"));
        return;
      }

      var nextIdx = idx;
      if (k === "ArrowRight") nextIdx = Math.min(tabBtns.length - 1, idx + 1);
      if (k === "ArrowLeft") nextIdx = Math.max(0, idx - 1);
      if (k === "Home") nextIdx = 0;
      if (k === "End") nextIdx = tabBtns.length - 1;

      var next = tabBtns[nextIdx];
      if (next) {
        showPanel(next.getAttribute("data-ed-tab"));
        next.scrollIntoView({ block: "nearest", inline: "nearest" });
        next.focus({ preventScroll: true });
      }
    });

    cardBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        showPanel(btn.getAttribute("data-ed-focus"));
      });
    });

    if (stepsToggle) {
      stepsToggle.addEventListener("click", function () {
        var collapsed = root.classList.toggle("ed-steps-collapsed");
        stepsToggle.setAttribute("aria-pressed", collapsed ? "false" : "true");
      });
    }

    if (faqRoot) {
      faqRoot.addEventListener("click", function (e) {
        var btn = e.target.closest(".ed-faq__q");
        if (!btn) return;

        var item = btn.closest(".ed-faq__item");
        if (!item) return;

        var isOpen = item.getAttribute("data-open") === "true";
        var answer = item.querySelector(".ed-faq__a");

        item.setAttribute("data-open", isOpen ? "false" : "true");
        btn.setAttribute("aria-expanded", isOpen ? "false" : "true");

        if (answer) {
          if (isOpen) {
            answer.classList.add("ed-hidden");
            answer.setAttribute("hidden", "");
          } else {
            answer.classList.remove("ed-hidden");
            answer.removeAttribute("hidden");
          }
        }
      });
    }

    tabsWrap.addEventListener(
      "scroll",
      function () { window.requestAnimationFrame(updateTabsAffordance); },
      { passive: true }
    );

    window.addEventListener("resize", function () {
      window.requestAnimationFrame(updateTabsAffordance);
    });

    var startKey = (defaultKey !== null && defaultKey !== "") ? String(defaultKey) : "0";
    showPanel(startKey);
    updateTabsAffordance();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var roots = document.querySelectorAll('[data-ed-root="eden-cycle-pro"]');
    Array.prototype.forEach.call(roots, initRoot);
  });
})();
