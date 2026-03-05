(() => {
  const ROOT_SELECTOR = '[data-myed-vitrine]';
  const TRIGGER_SELECTOR = '[data-vitrine-trigger], [data-myed-vt-open]';
  const DESKTOP_QUERY = '(min-width: 990px)';
  const SCROLL_LOCK_CLASS = 'myed-vitrine-sheet-open';
  const instances = new WeakMap();

  function collectRoots(container) {
    if (!container) return [];
    if (container.matches && container.matches(ROOT_SELECTOR)) return [container];
    if (!container.querySelectorAll) return [];
    return Array.from(container.querySelectorAll(ROOT_SELECTOR));
  }

  function readTriggerData(trigger) {
    return {
      title: trigger.dataset.title || '',
      description: trigger.dataset.description || '',
      price: trigger.dataset.price || '',
      compareAt: trigger.dataset.compareAt || '',
      image: trigger.dataset.image || '',
      imageAlt: trigger.dataset.imageAlt || trigger.dataset.title || '',
      url: trigger.dataset.url || '#',
      kicker: trigger.dataset.kicker || ''
    };
  }

  class VitrineSection {
    constructor(root) {
      this.root = root;
      this.panel = root.querySelector('[data-myed-vt-panel]');
      this.panelDialog = root.querySelector('.myed-vt-panel__dialog');
      this.sheet = root.querySelector('[data-myed-vt-sheet]');
      this.sheetPanel = root.querySelector('.myed-vitrine__sheet-panel');

      this.lastTrigger = null;
      this.initialized = false;

      this.boundClick = this.onClick.bind(this);
      this.boundKeyDown = this.onKeyDown.bind(this);
      this.boundResize = this.onResize.bind(this);
    }

    init() {
      if (this.initialized) return;
      this.root.addEventListener('click', this.boundClick);
      document.addEventListener('keydown', this.boundKeyDown);
      window.addEventListener('resize', this.boundResize);
      this.initialized = true;

      // Default selection on desktop: open panel with first product
      if (this.isDesktop() && this.panel && (this.panel.hidden || !this.panel.classList.contains('is-active'))) {
        const first = this.root.querySelector(TRIGGER_SELECTOR);
        if (first) {
          const productData = readTriggerData(first);
          if (!productData.kicker) productData.kicker = 'Ausgewählt';
          this.lastTrigger = first;
          this.setSelectedTrigger(first);
          this.updatePanel(productData);
          this.panel.hidden = false;
          this.panel.classList.add('is-active');
        }
      }
    }

    destroy() {
      if (!this.initialized) return;
      this.closeSheet({ restoreFocus: false });
      this.root.removeEventListener('click', this.boundClick);
      document.removeEventListener('keydown', this.boundKeyDown);
      window.removeEventListener('resize', this.boundResize);
      this.initialized = false;
    }

    isDesktop() {
      return window.matchMedia(DESKTOP_QUERY).matches;
    }

    setScrollLock(locked) {
      document.documentElement.classList.toggle(SCROLL_LOCK_CLASS, locked);
      document.body.classList.toggle(SCROLL_LOCK_CLASS, locked);
    }

    restoreFocus() {
      if (this.lastTrigger && document.contains(this.lastTrigger)) {
        this.lastTrigger.focus({ preventScroll: true });
      }
    }

    updatePanel(data) {
      if (!this.panel) return;

      const image = this.panel.querySelector('[data-myed-vt-panel-image]');
      const kicker = this.panel.querySelector('[data-myed-vt-panel-kicker]');
      const title = this.panel.querySelector('[data-myed-vt-panel-title]');
      const desc = this.panel.querySelector('[data-myed-vt-panel-desc]');
      const price = this.panel.querySelector('[data-myed-vt-panel-price]');
      const compare = this.panel.querySelector('[data-myed-vt-panel-compare]');
      const urlPrimary = this.panel.querySelector('[data-myed-vt-panel-url]');
      const urlSecondary = this.panel.querySelector('[data-myed-vt-panel-url-secondary]');

      if (image) {
        if (data.image) {
          image.src = data.image;
          image.alt = data.imageAlt;
        } else {
          image.removeAttribute('src');
          image.alt = '';
        }
      }
      if (kicker) kicker.textContent = data.kicker;
      if (title) title.textContent = data.title;
      if (desc) desc.textContent = data.description;
      if (price) price.textContent = data.price;
      if (compare) {
        compare.textContent = data.compareAt;
        compare.hidden = !data.compareAt;
      }
      if (urlPrimary) urlPrimary.href = data.url;
      if (urlSecondary) urlSecondary.href = data.url;
    }

    updateSheet(data) {
      if (!this.sheet) return;

      const image = this.sheet.querySelector('[data-sheet-image]');
      const kicker = this.sheet.querySelector('[data-sheet-kicker]');
      const title = this.sheet.querySelector('[data-sheet-title]');
      const desc = this.sheet.querySelector('[data-sheet-desc]');
      const price = this.sheet.querySelector('[data-sheet-price]');
      const compare = this.sheet.querySelector('[data-sheet-compare]');
      const urlPrimary = this.sheet.querySelector('[data-sheet-url]');
      const urlSecondary = this.sheet.querySelector('[data-sheet-url-secondary]');

      if (image) {
        if (data.image) {
          image.src = data.image;
          image.alt = data.imageAlt;
        } else {
          image.removeAttribute('src');
          image.alt = '';
        }
      }
      if (kicker) kicker.textContent = data.kicker;
      if (title) title.textContent = data.title;
      if (desc) desc.textContent = data.description;
      if (price) price.textContent = data.price;
      if (compare) {
        compare.textContent = data.compareAt;
        compare.hidden = !data.compareAt;
      }
      if (urlPrimary) urlPrimary.href = data.url;
      if (urlSecondary) urlSecondary.href = data.url;
    }

    setSelectedTrigger(trigger) {
      this.root.querySelectorAll(TRIGGER_SELECTOR).forEach((item) => {
        item.classList.remove('is-selected');
      });

      if (trigger && this.root.contains(trigger)) {
        trigger.classList.add('is-selected');
      }
    }

    openPanel(data, trigger) {
      if (!this.panel) return;
      this.lastTrigger = trigger;
      this.setSelectedTrigger(trigger);
      this.updatePanel(data);
      this.panel.classList.add('is-active');
      if (this.panelDialog) this.panelDialog.focus({ preventScroll: true });
    }

    closePanel(options = {}) {
      if (!this.panel) return;
      const isActive = this.panel.classList.contains('is-active');
      this.panel.classList.remove('is-active');
      if (isActive && options.restoreFocus !== false) {
        this.restoreFocus();
      }
    }

    openSheet(data, trigger) {
      if (!this.sheet) return;
      this.lastTrigger = trigger;
      this.setSelectedTrigger(trigger);
      this.updateSheet(data);
      this.sheet.hidden = false;
      this.setScrollLock(true);
      if (this.sheetPanel) this.sheetPanel.focus({ preventScroll: true });
    }

    closeSheet(options = {}) {
      if (!this.sheet) return;
      const wasOpen = !this.sheet.hidden;
      this.sheet.hidden = true;
      this.setScrollLock(false);
      if (wasOpen && options.restoreFocus !== false) {
        this.restoreFocus();
      }
    }

    onClick(event) {
      const trigger = event.target.closest(TRIGGER_SELECTOR);
      if (trigger && this.root.contains(trigger)) {
        event.preventDefault();
        const data = readTriggerData(trigger);
        if (this.isDesktop()) {
          this.openPanel(data, trigger);
        } else {
          this.openSheet(data, trigger);
        }
        return;
      }

      if (event.target.closest('[data-sheet-close]')) {
        event.preventDefault();
        this.closeSheet();
        return;
      }

      if (event.target.closest('[data-myed-vt-close]')) {
        event.preventDefault();
        this.closePanel();
        return;
      }

      if (this.isDesktop() && this.panel && this.panel.classList.contains('is-active')) {
        const clickedInsidePanel = event.target.closest('.myed-vt-panel__dialog');
        if (!clickedInsidePanel) {
          this.closePanel();
        }
      }
    }

    onKeyDown(event) {
      if (event.key !== 'Escape') return;

      if (this.sheet && !this.sheet.hidden) {
        this.closeSheet();
        return;
      }

      if (this.panel && this.panel.classList.contains('is-active')) {
        this.closePanel();
      }
    }

    onResize() {
      if (this.isDesktop() && this.sheet && !this.sheet.hidden) {
        this.closeSheet({ restoreFocus: false });
      }
    }
  }

  function initWithin(container) {
    collectRoots(container).forEach((root) => {
      if (instances.has(root)) return;
      const instance = new VitrineSection(root);
      instance.init();
      instances.set(root, instance);
    });
  }

  function destroyWithin(container) {
    collectRoots(container).forEach((root) => {
      const instance = instances.get(root);
      if (!instance) return;
      instance.destroy();
      instances.delete(root);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initWithin(document));
  } else {
    initWithin(document);
  }

  document.addEventListener('shopify:section:load', (event) => {
    initWithin(event.target);
  });

  document.addEventListener('shopify:section:unload', (event) => {
    destroyWithin(event.target);
  });
})();
