/* ========================================================================== 
  MyED — Vitrine (minimal JS)
  B2 behavior:
  - Slot selection + overlay modal
  - Product gallery (prev/next/dots)
  - ESC/backdrop close, focus restore, simple focus trap
========================================================================== */

class MyEDVitrine extends HTMLElement {
  connectedCallback() {
    this.sectionId = this.dataset.sectionId || '';
    this.slotButtons = Array.from(this.querySelectorAll('[data-myed-slot]'));

    this.modal = this.querySelector('.myed-vitrine__modal');
    this.dialog = this.querySelector('.myed-vitrine__dialog');
    this.closeButton = this.querySelector('.myed-vitrine__modal-close');
    this.imageElement = this.querySelector('.myed-vitrine__modal-img');
    this.titleElement = this.querySelector('[data-myed-title]');
    this.descElement = this.querySelector('[data-myed-desc]');
    this.ctaElement = this.querySelector('[data-myed-cta]');
    this.dotsElement = this.querySelector('[data-myed-dots]');
    this.prevButton = this.querySelector('[data-myed-prev]');
    this.nextButton = this.querySelector('[data-myed-next]');

    this.activeMedia = [];
    this.activeMediaIndex = 0;
    this.lastTriggerButton = null;

    this.onRootClick = this.onRootClick.bind(this);
    this.onDocumentKeydown = this.onDocumentKeydown.bind(this);

    this.addEventListener('click', this.onRootClick);
    document.addEventListener('keydown', this.onDocumentKeydown);

    if (this.slotButtons.length) {
      const initialIndex = this.parseIndex(this.dataset.selectedIndex, this.slotButtons[0].dataset.slotIndex);
      this.setSelected(initialIndex);
    }
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onRootClick);
    document.removeEventListener('keydown', this.onDocumentKeydown);

    if (!document.querySelector('.myed-vitrine .myed-vitrine__modal:not([hidden])')) {
      document.documentElement.classList.remove('myed-vt-lock');
    }
  }

  parseIndex(value, fallback) {
    const parsedValue = Number.parseInt(value, 10);
    if (Number.isFinite(parsedValue) && parsedValue > 0) return parsedValue;

    const parsedFallback = Number.parseInt(fallback, 10);
    if (Number.isFinite(parsedFallback) && parsedFallback > 0) return parsedFallback;

    return 1;
  }

  onRootClick(event) {
    const slotButton = event.target.closest('[data-myed-slot]');
    if (slotButton && this.contains(slotButton)) {
      const slotIndex = this.parseIndex(slotButton.dataset.slotIndex, 1);
      this.setSelected(slotIndex);
      this.openModalFromSlot(slotButton, slotIndex);
      return;
    }

    const closeTrigger = event.target.closest('[data-myed-modal-close]');
    if (closeTrigger && this.contains(closeTrigger)) {
      event.preventDefault();
      this.closeModal();
      return;
    }

    const prevTrigger = event.target.closest('[data-myed-prev]');
    if (prevTrigger && this.contains(prevTrigger)) {
      event.preventDefault();
      this.stepMedia(-1);
      return;
    }

    const nextTrigger = event.target.closest('[data-myed-next]');
    if (nextTrigger && this.contains(nextTrigger)) {
      event.preventDefault();
      this.stepMedia(1);
      return;
    }

    const dotTrigger = event.target.closest('[data-myed-dot]');
    if (dotTrigger && this.contains(dotTrigger)) {
      event.preventDefault();
      const dotIndex = this.parseIndex(dotTrigger.dataset.myedDot, 1) - 1;
      this.setMediaIndex(dotIndex);
    }
  }

  onDocumentKeydown(event) {
    if (!this.isModalOpen()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeModal();
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  isModalOpen() {
    return Boolean(this.modal && this.modal.hidden === false);
  }

  setSelected(index) {
    if (!this.slotButtons.length) return;

    const matchedButton = this.slotButtons.find((button) => {
      return this.parseIndex(button.dataset.slotIndex, 0) === index;
    });

    const selectedButton = matchedButton || this.slotButtons[0];
    if (!selectedButton) return;

    const selectedIndex = this.parseIndex(selectedButton.dataset.slotIndex, 1);
    this.dataset.selectedIndex = String(selectedIndex);

    this.slotButtons.forEach((button) => {
      const buttonIndex = this.parseIndex(button.dataset.slotIndex, 0);
      const isSelected = buttonIndex === selectedIndex;

      button.setAttribute('aria-pressed', isSelected ? 'true' : 'false');

      const slot = button.closest('.myed-vitrine__slot');
      if (slot) slot.classList.toggle('is-selected', isSelected);
    });
  }

  getSlotData(slotIndex, slotButton) {
    const payloadId = `myed-vt-slot-${this.sectionId}-${slotIndex}`;
    const payloadElement = document.getElementById(payloadId);

    let parsed = {};
    if (payloadElement) {
      try {
        parsed = JSON.parse(payloadElement.textContent || '{}');
      } catch (_error) {
        parsed = {};
      }
    }

    const images = Array.isArray(parsed.images)
      ? parsed.images
          .filter((item) => item && typeof item.src === 'string' && item.src !== '')
          .map((item) => ({
            src: item.src,
            alt: typeof item.alt === 'string' ? item.alt : '',
          }))
      : [];

    if (!images.length && slotButton) {
      const slotImage = slotButton.querySelector('img');
      if (slotImage && slotImage.currentSrc) {
        images.push({
          src: slotImage.currentSrc,
          alt: slotImage.alt || '',
        });
      } else if (slotImage && slotImage.src) {
        images.push({
          src: slotImage.src,
          alt: slotImage.alt || '',
        });
      }
    }

    return {
      title: typeof parsed.title === 'string' ? parsed.title : slotButton?.dataset.productTitle || '',
      url: typeof parsed.url === 'string' && parsed.url !== '' ? parsed.url : slotButton?.dataset.productUrl || '#',
      productDescHtml: typeof parsed.product_desc_html === 'string' ? parsed.product_desc_html : '',
      extraDescHtml: typeof parsed.extra_desc_html === 'string' ? parsed.extra_desc_html : '',
      images,
    };
  }

  openModalFromSlot(slotButton, slotIndex) {
    if (!this.modal) return;

    const slotData = this.getSlotData(slotIndex, slotButton);
    this.lastTriggerButton = slotButton;

    this.renderModal(slotData);
    this.modal.hidden = false;
    this.modal.setAttribute('aria-hidden', 'false');

    document.documentElement.classList.add('myed-vt-lock');

    if (this.closeButton) {
      this.closeButton.focus();
    } else if (this.dialog) {
      this.dialog.focus();
    }
  }

  closeModal(options = {}) {
    if (!this.modal || this.modal.hidden) return;

    this.modal.hidden = true;
    this.modal.setAttribute('aria-hidden', 'true');

    document.documentElement.classList.remove('myed-vt-lock');

    const shouldRestoreFocus = options.restoreFocus !== false;
    if (shouldRestoreFocus && this.lastTriggerButton && this.lastTriggerButton.isConnected) {
      this.lastTriggerButton.focus();
    }
  }

  renderModal(data) {
    if (this.titleElement) {
      this.titleElement.textContent = data.title || '';
    }

    if (this.descElement) {
      this.descElement.innerHTML = this.buildAccordionHtml(data);
    }

    if (this.ctaElement) {
      this.ctaElement.href = data.url || '#';
    }

    this.activeMedia = Array.isArray(data.images) ? data.images : [];
    this.activeMediaIndex = 0;

    this.renderDots();
    this.updateMedia();
  }

  buildAccordionHtml(data) {
    const items = [];

    const productDescHtml = typeof data.productDescHtml === 'string' ? data.productDescHtml.trim() : '';
    const extraDescHtml = typeof data.extraDescHtml === 'string' ? data.extraDescHtml.trim() : '';

    if (productDescHtml !== '') {
      items.push({
        title: 'Product details',
        html: productDescHtml,
      });
    }

    if (extraDescHtml !== '') {
      items.push({
        title: 'Extra notes',
        html: extraDescHtml,
      });
    }

    if (!items.length) return '';

    const accordionItemsHtml = items
      .map((item, index) => {
        const openAttr = index === 0 ? ' open' : '';
        return `<details${openAttr}><summary>${item.title}</summary><div class="myed-vitrine__acc-body rte">${item.html}</div></details>`;
      })
      .join('');

    return `<div class="myed-vitrine__acc">${accordionItemsHtml}</div>`;
  }

  renderDots() {
    if (!this.dotsElement) return;

    this.dotsElement.textContent = '';

    const fragment = document.createDocumentFragment();
    this.activeMedia.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'myed-vitrine__dot';
      dot.dataset.myedDot = String(index + 1);
      dot.setAttribute('aria-label', `Go to image ${index + 1}`);
      dot.setAttribute('aria-pressed', index === this.activeMediaIndex ? 'true' : 'false');
      if (index === this.activeMediaIndex) dot.classList.add('is-active');
      fragment.appendChild(dot);
    });

    this.dotsElement.appendChild(fragment);

    const hasMultiple = this.activeMedia.length > 1;
    if (this.prevButton) this.prevButton.disabled = !hasMultiple;
    if (this.nextButton) this.nextButton.disabled = !hasMultiple;
  }

  updateMedia() {
    if (!this.imageElement) return;

    const currentMedia = this.activeMedia[this.activeMediaIndex];
    if (currentMedia && currentMedia.src) {
      this.imageElement.src = currentMedia.src;
      this.imageElement.alt = currentMedia.alt || '';
      this.imageElement.removeAttribute('aria-hidden');
    } else {
      this.imageElement.removeAttribute('src');
      this.imageElement.alt = '';
      this.imageElement.setAttribute('aria-hidden', 'true');
    }

    if (this.dotsElement) {
      const dots = Array.from(this.dotsElement.querySelectorAll('[data-myed-dot]'));
      dots.forEach((dot, index) => {
        const isActive = index === this.activeMediaIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    }
  }

  stepMedia(step) {
    if (this.activeMedia.length < 2) return;

    const total = this.activeMedia.length;
    const nextIndex = (this.activeMediaIndex + step + total) % total;
    this.setMediaIndex(nextIndex);
  }

  setMediaIndex(index) {
    if (!Number.isInteger(index)) return;
    if (index < 0 || index >= this.activeMedia.length) return;

    this.activeMediaIndex = index;
    this.updateMedia();
  }

  trapFocus(event) {
    if (!this.dialog) return;

    const focusables = Array.from(
      this.dialog.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter((element) => {
      if (element.hasAttribute('hidden')) return false;
      if (element.getAttribute('aria-hidden') === 'true') return false;
      return true;
    });

    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const activeElement = document.activeElement;

    if (!this.dialog.contains(activeElement)) {
      event.preventDefault();
      first.focus();
      return;
    }

    if (event.shiftKey && activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

if (!customElements.get('myed-vitrine')) {
  customElements.define('myed-vitrine', MyEDVitrine);
}
