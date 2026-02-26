/* ==========================================================================
  MyED — Vitrine (minimal JS)
  - Mobile: bottom sheet open/close toggle
  - Desktop: panel always visible
  - No dependencies
========================================================================== */

class MyEDVitrine extends HTMLElement {
  connectedCallback() {
    this.breakpoint = parseInt(this.dataset.mobileBreak || "990", 10);

    this.btnOpen = this.querySelector("[data-myed-open]");
    this.btnClose = this.querySelector("[data-myed-close]");

    this.onToggleOpen = this.onToggleOpen.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
    this.onResize = this.onResize.bind(this);

    if (this.btnOpen) this.btnOpen.addEventListener("click", this.onToggleOpen);
    if (this.btnClose) this.btnClose.addEventListener("click", this.onToggleOpen);

    window.addEventListener("keydown", this.onKeydown, { passive: true });
    window.addEventListener("resize", this.onResize, { passive: true });

    // Default state
    this.applyMode();
  }

  disconnectedCallback() {
    if (this.btnOpen) this.btnOpen.removeEventListener("click", this.onToggleOpen);
    if (this.btnClose) this.btnClose.removeEventListener("click", this.onToggleOpen);
    window.removeEventListener("keydown", this.onKeydown);
    window.removeEventListener("resize", this.onResize);
  }

  isMobile() {
    return window.innerWidth < this.breakpoint;
  }

  applyMode() {
    if (!this.isMobile()) {
      // Desktop: ensure closed state doesn't matter
      this.removeAttribute("data-sheet");
      return;
    }
    // Mobile: default closed
    if (!this.getAttribute("data-sheet")) this.setAttribute("data-sheet", "closed");
  }

  onResize() {
    this.applyMode();
  }

  onKeydown(e) {
    if (e.key !== "Escape") return;
    if (!this.isMobile()) return;
    if (this.getAttribute("data-sheet") === "open") {
      this.setAttribute("data-sheet", "closed");
    }
  }

  onToggleOpen() {
    if (!this.isMobile()) return;
    const state = this.getAttribute("data-sheet");
    this.setAttribute("data-sheet", state === "open" ? "closed" : "open");
  }
}

if (!customElements.get("myed-vitrine")) {
  customElements.define("myed-vitrine", MyEDVitrine);
}