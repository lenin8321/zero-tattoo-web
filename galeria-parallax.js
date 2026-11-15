/**
 * ========================================================================
 * COMPONENTE: GALERÍA PARALLAX ASIMÉTRICA MULTI-SPEED (DARK LUXURY)
 * Estilo editorial de alto impacto (Awwwards / Spyker Cars / Balenciaga)
 * 
 * IMÁGENES DE CLIENTES EXCLUSIVAMENTE (SIN TEXTO EN LAS TARJETAS)
 * ========================================================================
 */

const GALLERY_ITEMS = [
  {
    id: "01",
    imageUrl: "img/cliente-1.jpg",
    aspectRatio: "aspect-3-4",
    column: 1
  },
  {
    id: "02",
    imageUrl: "img/cliente-2.jpg",
    aspectRatio: "aspect-4-5",
    column: 2
  },
  {
    id: "03",
    imageUrl: "img/cliente-3.jpg",
    aspectRatio: "aspect-3-4",
    column: 3
  },
  {
    id: "04",
    imageUrl: "img/cliente-4.jpg",
    aspectRatio: "aspect-4-5",
    column: 1
  },
  {
    id: "05",
    imageUrl: "img/cliente-5.jpg",
    aspectRatio: "aspect-3-4",
    column: 2
  },
  {
    id: "06",
    imageUrl: "img/cliente-6.jpg",
    aspectRatio: "aspect-4-5",
    column: 3
  }
];

/**
 * MOTOR DE LA GALERÍA PARALLAX ASIMÉTRICA
 */
class AsymmetricParallaxGallery {
  constructor(options = {}) {
    this.container = document.getElementById(options.containerId || 'asymmetricGalleryContainer');
    this.grid = document.getElementById(options.gridId || 'asymmetricGalleryGrid');
    this.items = options.items || GALLERY_ITEMS;
    
    // Columnas
    this.col1 = null;
    this.col2 = null;
    this.col3 = null;

    // Factores de velocidad de desplazamiento vertical (Multi-Speed)
    // Col 1 (Lenta): factor suave
    // Col 2 (Rápida): factor pronunciado
    // Col 3 (Intermedia): factor medio
    this.speedCol1 = -70;
    this.speedCol2 = -185;
    this.speedCol3 = -130;

    // Estado interno
    this.isDesktop = window.innerWidth >= 992;
    this.ticking = false;
    this.rafId = null;

    this.init();
  }

  init() {
    if (!this.container || !this.grid) return;

    this.render();
    this.bindEvents();
    this.updateParallax();
  }

  /**
   * Renderiza las tarjetas distribuidas en las 3 columnas asimétricas
   */
  render() {
    this.grid.innerHTML = `
      <div class="parallax-col parallax-col-1" data-speed="slow"></div>
      <div class="parallax-col parallax-col-2" data-speed="fast"></div>
      <div class="parallax-col parallax-col-3" data-speed="medium"></div>
    `;

    this.col1 = this.grid.querySelector('.parallax-col-1');
    this.col2 = this.grid.querySelector('.parallax-col-2');
    this.col3 = this.grid.querySelector('.parallax-col-3');

    this.items.forEach((item, index) => {
      let targetCol = this.col1;
      const colIndex = item.column || ((index % 3) + 1);

      if (colIndex === 2) targetCol = this.col2;
      else if (colIndex === 3) targetCol = this.col3;

      const card = this.createCardElement(item);
      targetCol.appendChild(card);
    });
  }

  /**
   * Genera el elemento DOM de una tarjeta (SOLO IMAGEN, SIN TEXTOS)
   */
  createCardElement(item) {
    const article = document.createElement('article');
    article.className = 'parallax-card';
    article.setAttribute('data-id', item.id);
    article.setAttribute('tabindex', '0');
    article.setAttribute('role', 'button');
    article.setAttribute('aria-label', `Ver foto de cliente ampliada ${item.id}`);

    const aspectClass = item.aspectRatio || 'aspect-3-4';

    article.innerHTML = `
      <div class="parallax-card-media ${aspectClass}">
        <img 
          src="${item.imageUrl}" 
          alt="Cliente Zero Tattoo ${item.id}" 
          loading="lazy" 
          decoding="async" 
          class="parallax-img"
        />
        <div class="parallax-media-overlay" aria-hidden="true"></div>
        <span class="parallax-badge-zoom" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </span>
      </div>
    `;

    // Clic / Enter para abrir en Lightbox
    const openCard = () => {
      if (typeof abrirLightbox === 'function') {
        abrirLightbox(item.imageUrl);
      }
    };

    article.addEventListener('click', openCard);
    article.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCard();
      }
    });

    return article;
  }

  /**
   * Vincula eventos de scroll y resize de alto rendimiento
   */
  bindEvents() {
    window.addEventListener('scroll', () => this.requestTick(), { passive: true });
    
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const wasDesktop = this.isDesktop;
        this.isDesktop = window.innerWidth >= 992;
        if (wasDesktop !== this.isDesktop) {
          this.resetTransforms();
        }
        this.requestTick();
      }, 100);
    }, { passive: true });
  }

  requestTick() {
    if (!this.ticking) {
      this.rafId = requestAnimationFrame(() => {
        this.updateParallax();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  /**
   * Actualiza el desplazamiento de cada columna mediante translate3d por hardware GPU
   */
  updateParallax() {
    // En móviles / tablets desactivamos parallax para garantizar 60 FPS fijos
    if (!this.isDesktop) {
      this.resetTransforms();
      return;
    }

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.resetTransforms();
      return;
    }

    if (!this.container || !this.col1 || !this.col2 || !this.col3) return;

    const rect = this.container.getBoundingClientRect();
    const windowH = window.innerHeight;

    if (rect.bottom < -200 || rect.top > windowH + 200) return;

    // Progreso normalizado de 0 a 1 mientras la galería cruza la pantalla
    const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH + rect.height)));

    const y1 = progress * this.speedCol1;
    const y2 = progress * this.speedCol2;
    const y3 = progress * this.speedCol3;

    this.col1.style.transform = `translate3d(0, ${y1.toFixed(2)}px, 0)`;
    this.col2.style.transform = `translate3d(0, ${y2.toFixed(2)}px, 0)`;
    this.col3.style.transform = `translate3d(0, ${y3.toFixed(2)}px, 0)`;
  }

  /**
   * Resetea las transformaciones al cambiar a vista móvil o redimensionar
   */
  resetTransforms() {
    if (this.col1) this.col1.style.transform = '';
    if (this.col2) this.col2.style.transform = '';
    if (this.col3) this.col3.style.transform = '';
  }
}

// Inicialización automática cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.zeroParallaxGallery = new AsymmetricParallaxGallery();
  });
} else {
  window.zeroParallaxGallery = new AsymmetricParallaxGallery();
}
