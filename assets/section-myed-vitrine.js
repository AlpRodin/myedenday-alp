/* ==========================================================================
  MyEdenDay — Vitrine (Minimal JS)
  - Carousel arrows: scrollBy
  - Quick panel: open/close
========================================================================== */

(function () {
  function closest(el, sel) {
    while (el && el.nodeType === 1) {
      if (el.matches(sel)) return el;
      el = el.parentElement;
    }
    return null;
  }

  function initVitrine(root) {
    const list = root.querySelector('[data-myed-vt-list]');
    const panel = root.querySelector('[data-myed-vt-panel]');
    if (!list || !panel) return;

    const btnPrev = root.querySelector('[data-myed-vt-prev]');
    const btnNext = root.querySelector('[data-myed-vt-next]');

    if (btnPrev && btnNext) {
      const step = () => Math.max(220, Math.floor(list.clientWidth * 0.6));
      btnPrev.addEventListener('click', () => list.scrollBy({ left: -step(), behavior: 'smooth' }));
      btnNext.addEventListener('click', () => list.scrollBy({ left: step(), behavior: 'smooth' }));
    }

    const galleryEl = panel.querySelector('[data-myed-vt-gallery]');
    const titleEl = panel.querySelector('[data-myed-vt-panel-title]');
    const priceEl = panel.querySelector('[data-myed-vt-panel-price]');
    const compareEl = panel.querySelector('[data-myed-vt-panel-compare]');
    const descEl = panel.querySelector('[data-myed-vt-panel-desc]');
    const urlEl = panel.querySelector('[data-myed-vt-panel-url]');
    const dialog = panel.querySelector('.myed-vt-panel__dialog');
    const sheet = root.querySelector('.myed-vitrine__sheet');

    function openPanel(data) {
      panel.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');

      if (galleryEl) {
        galleryEl.innerHTML = '';
        const raw = data.gallery || '';
        const urls = raw.split('|').map(s => s.trim()).filter(Boolean);
        urls.forEach((src) => {
          const slide = document.createElement('div');
          slide.className = 'myed-vt-gallery__slide';
          const img = document.createElement('img');
          img.className = 'myed-vt-gallery__img';
          img.loading = 'lazy';
          img.alt = data.title || '';
          img.src = src;
          slide.appendChild(img);
          galleryEl.appendChild(slide);
        });
      }
      if (titleEl) titleEl.textContent = data.title || '';
      if (priceEl) priceEl.textContent = data.price || '';
      if (compareEl) {
        compareEl.textContent = data.compare || '';
        compareEl.style.display = data.compare ? 'inline' : 'none';
      }
      if (descEl) descEl.textContent = data.desc || '';
      if (urlEl) urlEl.href = data.url || '#';

      if (dialog) dialog.focus({ preventScroll: true });
    }

    function closePanel() {
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
    }

    if (sheet) {
      const sheetImg = sheet.querySelector('.myed-vitrine__sheet-img');
      const sheetTitle = sheet.querySelector('[data-sheet-title]');
      const sheetPrice = sheet.querySelector('[data-sheet-price]');
      const sheetKicker = sheet.querySelector('[data-sheet-kicker]');
      const sheetItemsWrap = sheet.querySelector('[data-sheet-items]');
      const sheetCta = sheet.querySelector('[data-sheet-url]');
      const sheetLink = sheet.querySelector('[data-sheet-url-secondary]');

      const openSheet = () => {
        sheet.hidden = false;
        document.documentElement.classList.add('myed-sheet-open');
      };
      const closeSheet = () => {
        sheet.hidden = true;
        document.documentElement.classList.remove('myed-sheet-open');
      };

      sheet.addEventListener('click', (e) => {
        if (e.target.matches('[data-sheet-close]')) closeSheet();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !sheet.hidden) closeSheet();
      });

      let tappables = root.querySelectorAll('.myed-vt-card__btn[data-title][data-url], .myed-vitrine__item, .myed-vitrine__product');
      if (!tappables.length) tappables = root.querySelectorAll('[data-title][data-url]');

      // --- Swipe state (mobile sheet) ---
      const items = Array.from(tappables);
      let currentIndex = -1;

      function renderSheetFromEl(el) {
        if (sheetTitle) sheetTitle.textContent = el.dataset.title || '';
        if (sheetPrice) sheetPrice.textContent = el.dataset.price || '';
        if (sheetKicker) sheetKicker.textContent = el.dataset.kicker || '';

        if (sheetImg) {
          sheetImg.alt = el.dataset.title || '';
          const image = el.dataset.image || el.dataset.img || '';
          if (image) {
            sheetImg.src = image;
          } else {
            sheetImg.removeAttribute('src');
          }
        }

        const url = el.dataset.url || '#';
        if (sheetCta) sheetCta.href = url;
        if (sheetLink) sheetLink.href = url;

        // Spotlight items (1..5)
        let anyItem = false;

        for (let i = 1; i <= 5; i++) {
          const t = (el.dataset['i' + i + 't'] || '').trim();
          const b = (el.dataset['i' + i + 'b'] || '').trim();

          const item = sheet.querySelector('[data-sheet-item="' + i + '"]');
          const title = sheet.querySelector('[data-sheet-item-title="' + i + '"]');
          const body = sheet.querySelector('[data-sheet-item-body="' + i + '"]');

          if (!item || !title || !body) continue;

          if (t && b) {
            anyItem = true;
            item.hidden = false;
            item.open = false;
            title.textContent = t;
            body.textContent = b;
          } else {
            item.hidden = true;
            item.open = false;
            title.textContent = '';
            body.textContent = '';
          }
        }

        if (sheetItemsWrap) sheetItemsWrap.hidden = !anyItem;
      }

      function openSheetForIndex(i) {
        if (!items.length) return;
        // wrap
        if (i < 0) i = items.length - 1;
        if (i >= items.length) i = 0;

        currentIndex = i;
        const el = items[currentIndex];
        renderSheetFromEl(el);
        openSheet();
      }

      // --- Swipe handlers (only when sheet open) ---
      const sheetPanel = sheet.querySelector('.myed-vitrine__sheet-panel');
      let startX = 0;
      let startY = 0;

      function go(delta) {
        if (currentIndex === -1) return;
        openSheetForIndex(currentIndex + delta);
      }

      if (sheetPanel) {
        sheetPanel.addEventListener('touchstart', (e) => {
          const t = e.touches && e.touches[0];
          if (!t) return;
          startX = t.clientX;
          startY = t.clientY;
        }, { passive: true });

        sheetPanel.addEventListener('touchend', (e) => {
          if (sheet.hidden) return;
          const t = e.changedTouches && e.changedTouches[0];
          if (!t) return;

          const dx = t.clientX - startX;
          const dy = t.clientY - startY;

          // Yatay swipe değilse ignore (scroll ile çakışmasın)
          if (Math.abs(dx) < 45) return;
          if (Math.abs(dy) > Math.abs(dx) * 0.7) return;

          if (dx < 0) go(+1); // swipe left -> next
          else go(-1); // swipe right -> prev
        }, { passive: true });
      }

      tappables.forEach((el, idx) => {
        el.addEventListener('click', () => {
          if (!window.matchMedia('(max-width: 749px)').matches) return;
          openSheetForIndex(idx);
        });
      });
    }

    root.addEventListener('click', (e) => {
      const openBtn = closest(e.target, '[data-myed-vt-open]');
      if (openBtn) {
        if (window.matchMedia('(max-width: 749px)').matches) return;

        // GUARD: ürün datası yoksa panel açma
        if (!openBtn.dataset || !openBtn.dataset.url || !openBtn.dataset.title) return;

        openPanel({
          title: openBtn.dataset.title,
          price: openBtn.dataset.price,
          compare: openBtn.dataset.compare,
          url: openBtn.dataset.url,
          img: openBtn.dataset.img,
          gallery: openBtn.dataset.gallery,
          desc: openBtn.dataset.desc
        });
        return;
      }
      if (closest(e.target, '[data-myed-vt-close]')) {
        closePanel();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.myed-vitrine').forEach(initVitrine);
  });
})();
