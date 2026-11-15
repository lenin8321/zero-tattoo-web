/**
 * ============================================================================
 * LÓGICA INTERACTIVA — ZERO TATTOO COLOMBIA (script.js)
 * ============================================================================
 */

let idiomaActual = leerIdiomaGuardado();
let filtroActual = "all";
let observadorAnimaciones = null;

// Elementos que aparecen con animación al hacer scroll
const SELECTOR_ANIMACION =
  ".display-heading, .editorial-lead, .staggered-card, .portfolio-item, .about-card-white, .about-card-glass, .piercing-frame, .kharkiv-box, .video-card, .client-card, .review-card, .meta-list__row, .payment-card";

document.addEventListener("DOMContentLoaded", () => {
  // Menú móvil
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    const setMenu = (abierto) => {
      navLinks.classList.toggle("open", abierto);
      menuToggle.setAttribute("aria-expanded", String(abierto));
    };
    menuToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });
  }

  // Selector de idioma ES / EN
  const btnEs = document.getElementById("btnLangEs");
  const btnEn = document.getElementById("btnLangEn");
  if (btnEs) btnEs.addEventListener("click", () => cambiarIdioma("es"));
  if (btnEn) btnEn.addEventListener("click", () => cambiarIdioma("en"));

  // Filtros de estilos de tatuaje
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      filtroActual = btn.getAttribute("data-filter") || "all";
      renderizarPortafolio();
      observarAnimaciones();
    });
  });

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxClose = document.getElementById("lightboxClose");
  if (lightbox) lightbox.addEventListener("click", cerrarLightbox);
  if (lightboxClose) lightboxClose.addEventListener("click", cerrarLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarLightbox();
  });

  const imgPiercing = document.getElementById("imgPiercingEsmeraldas");
  if (imgPiercing) {
    imgPiercing.style.cursor = "pointer";
    imgPiercing.addEventListener("click", () => abrirLightbox(imgPiercing.getAttribute("src")));
  }

  iniciarAnimaciones();
  initMaskedHeadingReveal();
  conectarEnlacesContacto();
  initLuxuryMenu();
  initLuxuryMarquee();
  initLuxuryPreloader({
    duration: 1800,             // 1.8 segundos de presencia minimalista
    enableSessionStorage: false // Se muestra en las navegaciones para que lo puedas apreciar
  });
  cambiarIdioma(idiomaActual);
});

// Recuerda el idioma elegido al pasar entre páginas
function leerIdiomaGuardado() {
  try {
    const guardado = localStorage.getItem("zeroIdioma");
    return guardado === "en" ? "en" : "es";
  } catch (e) {
    return "es";
  }
}

function conectarEnlacesContacto() {
  const numWa = CONFIG_ZERO.contacto.whatsappNumero;
  const urlWaGeneral = `https://wa.me/${numWa}?text=${encodeURIComponent(
    "Hola Zero Tattoo, quiero cotizar un tatuaje o piercing."
  )}`;
  const urlWaPiercing = `https://wa.me/${numWa}?text=${encodeURIComponent(
    "Hola Zero Tattoo, quiero información sobre Body Piercing y Joyería con Esmeraldas Colombianas."
  )}`;

  const enlazar = (ids, url) => {
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.href = url;
        el.target = "_blank";
        el.rel = "noopener";
      }
    });
  };

  enlazar(["navCtaWhatsapp", "heroBtnWa", "floatWaBtn", "footerWaBtn", "ctaBtnWa"], urlWaGeneral);
  enlazar(["piercingBtnWa"], urlWaPiercing);
  enlazar(["footerIgLink"], CONFIG_ZERO.contacto.instagramUrl);
  enlazar(["heroBtnLinktree", "footerLinktreeLink"], CONFIG_ZERO.contacto.linktreeUrl);
}

function cambiarIdioma(nuevoIdioma) {
  idiomaActual = nuevoIdioma;
  document.documentElement.lang = nuevoIdioma;
  try {
    localStorage.setItem("zeroIdioma", nuevoIdioma);
  } catch (e) {}

  const btnEs = document.getElementById("btnLangEs");
  const btnEn = document.getElementById("btnLangEn");
  if (btnEs && btnEn) {
    btnEs.classList.toggle("active", nuevoIdioma === "es");
    btnEn.classList.toggle("active", nuevoIdioma === "en");
    btnEs.setAttribute("aria-pressed", String(nuevoIdioma === "es"));
    btnEn.setAttribute("aria-pressed", String(nuevoIdioma === "en"));
  }

  aplicarIdioma(nuevoIdioma);
}

function aplicarIdioma(lang) {
  const diccionario = CONFIG_ZERO.textos[lang] || CONFIG_ZERO.textos.es;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const clave = el.getAttribute("data-i18n");
    if (diccionario[clave]) {
      el.textContent = diccionario[clave];
    }
  });

  renderizarPortafolio();
  renderizarVideos();
  renderizarClientes();
  renderizarResenas();
  renderizarSedes();
  renderizarMediosDePago();
  observarAnimaciones();
  initScrollScrubReveal();
}

function renderizarPortafolio() {
  const contenedor = document.getElementById("portfolioGrid");
  if (!contenedor) return;

  const itemsFiltrados =
    filtroActual === "all"
      ? CONFIG_ZERO.galeriaTattoos
      : CONFIG_ZERO.galeriaTattoos.filter((item) => item.categoria === filtroActual);

  contenedor.innerHTML = itemsFiltrados
    .map((item) => {
      const estilo = idiomaActual === "es" ? item.estiloEs : item.estiloEn;
      const titulo = idiomaActual === "es" ? item.tituloEs : item.tituloEn;
      return `
        <article class="portfolio-item" data-img="${item.imagen}">
          <img src="${item.imagen}" alt="${titulo}" loading="lazy" decoding="async" />
          <div class="portfolio-overlay">
            <span class="portfolio-style">${estilo}</span>
            <h3 class="portfolio-title">${titulo}</h3>
          </div>
        </article>
      `;
    })
    .join("");

  contenedor.querySelectorAll(".portfolio-item").forEach((card) => {
    card.addEventListener("click", () => abrirLightbox(card.getAttribute("data-img")));
  });
}

function renderizarVideos() {
  const contenedor = document.getElementById("videosGrid");
  if (!contenedor) return;

  contenedor.innerHTML = CONFIG_ZERO.videosEstudio
    .map((vid) => {
      const titulo = idiomaActual === "es" ? vid.tituloEs : vid.tituloEn;
      return `
        <article class="video-card">
          <video controls preload="metadata" poster="${vid.poster}">
            <source src="${vid.archivo}" type="video/mp4" />
          </video>
          <div class="video-caption">${titulo}</div>
        </article>
      `;
    })
    .join("");
}

function renderizarClientes() {
  const contenedor = document.getElementById("clientsGrid");
  if (!contenedor) return;

  contenedor.innerHTML = CONFIG_ZERO.galeriaClientes
    .map((cli) => {
      const titulo = idiomaActual === "es" ? cli.tituloEs : cli.tituloEn;
      return `
        <article class="client-card" data-img="${cli.imagen}">
          <img src="${cli.imagen}" alt="${titulo}" loading="lazy" decoding="async" />
          <p>${titulo}</p>
        </article>
      `;
    })
    .join("");

  contenedor.querySelectorAll(".client-card").forEach((card) => {
    card.addEventListener("click", () => abrirLightbox(card.getAttribute("data-img")));
  });
}

function renderizarResenas() {
  const contenedor = document.getElementById("reviewsGrid");
  if (!contenedor) return;

  contenedor.innerHTML = CONFIG_ZERO.resenas
    .map((rev) => {
      const texto = idiomaActual === "es" ? rev.textoEs : rev.textoEn;
      const ubicacion = idiomaActual === "es" ? rev.ubicacionEs : rev.ubicacionEn;
      const estrellas = "★".repeat(rev.estrellas);
      return `
        <article class="review-card">
          <div class="review-stars" aria-label="${rev.estrellas}/5">${estrellas}</div>
          <p class="review-text">“${texto}”</p>
          <div class="review-author">${rev.nombre}</div>
          <div class="review-location">${ubicacion}</div>
        </article>
      `;
    })
    .join("");
}

function renderizarSedes() {
  const contenedor = document.getElementById("locationsGrid");
  if (!contenedor) return;

  const t = CONFIG_ZERO.textos[idiomaActual] || CONFIG_ZERO.textos.es;

  contenedor.innerHTML = CONFIG_ZERO.sedes
    .map((sede, idx) => {
      const zona = idiomaActual === "es" ? sede.zonaEs : sede.zonaEn;
      const direccion = idiomaActual === "es" ? sede.direccionEs : sede.direccionEn;
      const horario = idiomaActual === "es" ? sede.horarioEs : sede.horarioEn;
      const mensajeWa = encodeURIComponent(
        idiomaActual === "es" ? sede.whatsappMensajeEs : sede.whatsappMensajeEn
      );
      const urlWa = `https://wa.me/${CONFIG_ZERO.contacto.whatsappNumero}?text=${mensajeWa}`;
      const claseCaja = idx === 0 ? "kharkiv-box red-box" : "kharkiv-box";

      return `
        <article class="${claseCaja}">
          <div class="kharkiv-box-header">
            <h3>${sede.ciudad} · ${zona}</h3>
          </div>
          <div class="kharkiv-meta-list">
            <div>
              <div class="kharkiv-meta-label"><img src="Icon/location.svg" class="meta-icon" alt="" /> ${t.lblDireccion}</div>
              <div>${direccion}</div>
            </div>
            <div>
              <div class="kharkiv-meta-label"><img src="Icon/horario.svg" class="meta-icon" alt="" /> ${t.lblHorario}</div>
              <div>${horario}</div>
            </div>
            <div>
              <div class="kharkiv-meta-label"><img src="Icon/modalidad.svg" class="meta-icon" alt="" /> ${t.lblModalidad}</div>
              <div>${t.txtWalkins} · ${CONFIG_ZERO.contacto.telefonoMostrar}</div>
            </div>
          </div>
          <div class="kharkiv-actions">
            <a href="${urlWa}" target="_blank" rel="noopener" class="btn-square-white"><img src="Icon/whatsapp.svg" class="btn-icon" alt="" /> ${t.btnAgendarSede} ↗</a>
            <a href="${sede.mapaUrl}" target="_blank" rel="noopener" class="btn-square-outline"><img src="Icon/location.svg" class="btn-icon icon-white" alt="" /> ${t.btnComoLlegar} ↗</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderizarMediosDePago() {
  const contenedor = document.getElementById("paymentsGrid");
  if (!contenedor || !CONFIG_ZERO.mediosDePago) return;

  contenedor.innerHTML = CONFIG_ZERO.mediosDePago
    .map((pago) => {
      const titulo = idiomaActual === "es" ? pago.tituloEs : pago.tituloEn;
      const detalle = idiomaActual === "es" ? pago.detalleEs : pago.detalleEn;
      const iconoHtml = (pago.icono && (pago.icono.includes('.') || pago.icono.includes('/')))
        ? `<img src="${pago.icono}" alt="" />`
        : pago.icono;

      return `
        <div class="meta-list__row">
          <dt class="meta-list__key">
            <span class="meta-list__icon" aria-hidden="true">${iconoHtml}</span>
            <span class="meta-list__title">${titulo}</span>
          </dt>
          <dd class="meta-list__val">${detalle}</dd>
        </div>
      `;
    })
    .join("");
}

/* --------------------------------------------------------------------------
   ANIMACIONES AL HACER SCROLL
   Cada elemento aparece una sola vez. Los elementos nuevos que se generan al
   cambiar de idioma o de filtro también se animan.
   -------------------------------------------------------------------------- */
function iniciarAnimaciones() {
  const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (sinMovimiento || !("IntersectionObserver" in window)) return;

  observadorAnimaciones = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -40px 0px", threshold: 0.12 }
  );
}

function observarAnimaciones() {
  if (!observadorAnimaciones) return;
  document.querySelectorAll(SELECTOR_ANIMACION).forEach((el) => {
    if (el.classList.contains("fade-in-section")) return;
    el.classList.add("fade-in-section");
    observadorAnimaciones.observe(el);
  });
}

/* --------------------------------------------------------------------------
   VISOR DE IMÁGENES (LIGHTBOX)
   -------------------------------------------------------------------------- */
function abrirLightbox(rutaImagen) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  if (lightbox && lightboxImg && rutaImagen) {
    lightboxImg.src = rutaImagen;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    const btnCerrar = document.getElementById("lightboxClose");
    if (btnCerrar) btnCerrar.focus();
  }
}

function cerrarLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox && lightbox.classList.contains("open")) {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }
}


/* --------------------------------------------------------------------------
   SCROLL-SCRUBBING TEXT REVEAL (GSAP & ScrollTrigger)
   -------------------------------------------------------------------------- */
function splitTextToChars(element) {
  const fullText = element.textContent.trim();
  element.setAttribute("aria-label", fullText);
  element.innerHTML = "";

  const words = fullText.split(" ");
  words.forEach((word, wIdx) => {
    const wordSpan = document.createElement("span");
    wordSpan.style.display = "inline-block";
    wordSpan.style.whiteSpace = "nowrap";

    for (let char of word) {
      const charSpan = document.createElement("span");
      charSpan.className = "char";
      charSpan.setAttribute("aria-hidden", "true");
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
    }

    element.appendChild(wordSpan);

    if (wIdx < words.length - 1) {
      const space = document.createElement("span");
      space.className = "whitespace";
      space.setAttribute("aria-hidden", "true");
      space.innerHTML = "&nbsp;";
      element.appendChild(space);
    }
  });

  return element.querySelectorAll(".char");
}

function initScrollScrubReveal() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Limpiar ScrollTriggers previos si existen
  ScrollTrigger.getAll().forEach((t) => {
    if (t.vars && t.vars.id && String(t.vars.id).startsWith("scrub-text")) {
      t.kill();
    }
  });

  const targets = document.querySelectorAll(".scroll-scrub-text");
  targets.forEach((target, index) => {
    const chars = splitTextToChars(target);

    gsap.fromTo(
      chars,
      { color: "rgba(255, 255, 255, 0.18)" },
      {
        color: "#ffffff",
        ease: "none",
        stagger: 0.05,
        scrollTrigger: {
          id: `scrub-text-${index}`,
          trigger: target,
          start: "top 75%",
          end: "bottom 35%",
          scrub: 1,
          invalidateOnRefresh: true
        }
      }
    );
  });
}

/* --------------------------------------------------------------------------
   MASKED HEADING STAGGER REVEAL (GSAP & ScrollTrigger)
   Inspirado en tomdekoning.work / Awwwards
   -------------------------------------------------------------------------- */
function initMaskedHeadingReveal() {
  const containers = document.querySelectorAll(".masked-heading-container");
  if (!containers.length) return;

  const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (sinMovimiento) {
    document.querySelectorAll(".masked-char, .masked-item").forEach((el) => {
      el.style.transform = "none";
    });
    return;
  }

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    document.querySelectorAll(".masked-char, .masked-item").forEach((el) => {
      el.style.transform = "none";
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  containers.forEach((container) => {
    let targets = container.querySelectorAll(".masked-char");
    if (!targets.length) {
      targets = container.querySelectorAll(".masked-item");
    }
    if (!targets.length) return;

    // Detectar si el preloader aún está presente en pantalla
    const preloader = document.getElementById("luxuryPreloader");
    const preloaderActivo = preloader && !preloader.classList.contains("is-completed");
    const delayInicial = preloaderActivo ? 1.6 : 0.15;

    gsap.fromTo(
      targets,
      { yPercent: 115 },
      {
        yPercent: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.04,
        delay: delayInicial,
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          once: true
        }
      }
    );
  });
}


/* ==========================================================================
   LÓGICA DEL MENÚ DARK LUXURY FULLSCREEN (tomdekoning.work)
   ========================================================================== */
function initLuxuryMenu() {
  const toggleBtn = document.getElementById("luxuryMenuToggle");
  const toggleText = document.getElementById("luxuryMenuText");
  const closeBtn = document.getElementById("luxuryMenuCloseBtn");
  const overlay = document.getElementById("luxuryMenuOverlay");
  const links = document.querySelectorAll(".luxury-nav-link");

  if (!toggleBtn || !overlay) return;

  // 1. Preparar el Rolling Character Effect en cada enlace
  links.forEach((link) => {
    const rawText = link.textContent.trim();
    link.setAttribute("aria-label", rawText);
    link.innerHTML = "";

    [...rawText].forEach((char, idx) => {
      if (char === " ") {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        space.setAttribute("aria-hidden", "true");
        link.appendChild(space);
        return;
      }

      const wrapper = document.createElement("span");
      wrapper.className = "luxury-char-wrapper";
      wrapper.setAttribute("aria-hidden", "true");

      const primary = document.createElement("span");
      primary.className = "char-primary";
      primary.textContent = char;
      primary.style.transitionDelay = `${idx * 0.022}s`;

      const clone = document.createElement("span");
      clone.className = "char-clone";
      clone.textContent = char;
      clone.style.transitionDelay = `${idx * 0.022}s`;

      wrapper.appendChild(primary);
      wrapper.appendChild(clone);
      link.appendChild(wrapper);
    });
  });

  // 2. Funciones para Abrir y Cerrar el Menú
  function openMenu() {
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.setAttribute("aria-label", "Cerrar menú");
    if (toggleText) toggleText.textContent = "CLOSE";
    document.body.classList.add("luxury-lock-scroll");
  }

  function closeMenu() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Abrir menú de navegación");
    if (toggleText) toggleText.textContent = "MENU";
    document.body.classList.remove("luxury-lock-scroll");
  }

  // Evento clic en el botón disparador
  toggleBtn.addEventListener("click", () => {
    const isOpen = overlay.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Evento clic en el botón cerrar (X)
  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  // Cerrar al pulsar Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) {
      closeMenu();
    }
  });

  // 3. Manejo de clics en enlaces con Smooth Scroll para anclas (#seccion)
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      if (href && href.startsWith("#")) {
        e.preventDefault();
        closeMenu();

        const targetEl = document.querySelector(href);
        if (targetEl) {
          setTimeout(() => {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }, 300);
        }
      } else {
        closeMenu();
      }
    });
  });
}


/* ==========================================================================
   MARQUESINA TIPOGRÁFICA INFINITA REACTIVA A SCROLL (tomdekoning.work)
   ========================================================================== */
function initLuxuryMarquee() {
  const track = document.getElementById("luxuryTickerTrack");
  if (!track) return;

  // Velocidad base crucero (píxeles por frame aprox.)
  let baseVelocity = -1.2;
  let currentVelocity = baseVelocity;
  let targetVelocity = baseVelocity;
  let currentX = 0;
  let isHovered = false;

  // Detección de pausa al hacer hover
  track.addEventListener("mouseenter", () => { isHovered = true; });
  track.addEventListener("mouseleave", () => { isHovered = false; });

  // ScrollTrigger para capturar velocidad del scroll del usuario
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      onUpdate: (self) => {
        // self.getVelocity() devuelve px/segundo con signo (+ abajo, - arriba)
        const scrollVelocity = self.getVelocity();

        // Si se scrollea hacia abajo o arriba, acelerar proporcionalmente
        if (Math.abs(scrollVelocity) > 40) {
          // Dirección natural: hacia la izquierda con scroll down, o inverso con scroll up
          const boost = (scrollVelocity / 350);
          targetVelocity = baseVelocity - boost;

          // Limitar aceleración máxima para mantener estética de lujo
          targetVelocity = Math.max(-14, Math.min(10, targetVelocity));
        }
      }
    });
  }

  // Bucle de animación continuo usando requestAnimationFrame
  function renderMarquee() {
    if (!isHovered) {
      // Interpolación suave (lerp) para regresar a la velocidad base
      currentVelocity += (targetVelocity - currentVelocity) * 0.08;
      targetVelocity += (baseVelocity - targetVelocity) * 0.05;

      currentX += currentVelocity;

      // El track contiene 2 items idénticos de 50% de ancho total cada uno.
      // Cuando supera el 50% de desplazamiento en cualquier dirección, reinicia el ciclo sin salto visual
      const halfWidth = track.scrollWidth / 2;

      if (currentX <= -halfWidth) {
        currentX += halfWidth;
      } else if (currentX >= 0) {
        currentX -= halfWidth;
      }

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
    }

    requestAnimationFrame(renderMarquee);
  }

  requestAnimationFrame(renderMarquee);
}


/* ==========================================================================
   LÓGICA EDITORIAL CONTEMPORÁNEA (vivmgmt.com)
   Header dinámico con scroll, Conmutador Dock (Editorial/Grid),
   Directorio a pantalla completa con recuentos dinámicos y Floating Preview.
   ========================================================================== */
function initVivEditorialPortfolio() {
  // 1. Header con detección de scroll
  const navbar = document.getElementById("vivNavbar");
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add("is-scrolled");
      } else {
        navbar.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // Clic en tarjetas asimétricas del Hero para abrir lightbox
  document.querySelectorAll(".viv-asym-card").forEach((card) => {
    card.addEventListener("click", () => {
      const imgPath = card.getAttribute("data-img");
      if (imgPath && typeof abrirLightbox === "function") {
        abrirLightbox(imgPath);
      }
    });
  });

  // 2. Conmutador Dock Flotante (Editorial vs Grid)
  const btnEditorial = document.getElementById("vivViewEditorial");
  const btnGrid = document.getElementById("vivViewGrid");
  const portfolioGrid = document.getElementById("portfolioGrid");

  if (btnEditorial && btnGrid && portfolioGrid) {
    btnEditorial.addEventListener("click", () => {
      btnEditorial.classList.add("active");
      btnGrid.classList.remove("active");
      portfolioGrid.classList.remove("layout-grid");
      portfolioGrid.classList.add("layout-editorial");
    });

    btnGrid.addEventListener("click", () => {
      btnGrid.classList.add("active");
      btnEditorial.classList.remove("active");
      portfolioGrid.classList.remove("layout-editorial");
      portfolioGrid.classList.add("layout-grid");
    });
  }

  // 3. Directorio / Overlay a pantalla completa con Hover Preview flotante
  const dirOverlay = document.getElementById("vivDirectoryOverlay");
  const dirOpenBtn = document.getElementById("vivDirectoryOpenBtn");
  const dirCloseBtn = document.getElementById("vivDirectoryCloseBtn");
  const dirListContainer = document.getElementById("vivDirList");
  const dirFiltersContainer = document.getElementById("vivDirFilters");
  const floatPreview = document.getElementById("vivFloatingPreview");
  const floatImg = document.getElementById("vivFloatingImg");
  const floatCaption = document.getElementById("vivFloatingCaption");

  if (!dirOverlay || !dirOpenBtn || !dirListContainer) return;

  function abrirDirectorio() {
    dirOverlay.classList.add("is-open");
    dirOverlay.setAttribute("aria-hidden", "false");
    dirOpenBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("luxury-lock-scroll");
  }

  function cerrarDirectorio() {
    dirOverlay.classList.remove("is-open");
    dirOverlay.setAttribute("aria-hidden", "true");
    dirOpenBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("luxury-lock-scroll");
    if (floatPreview) floatPreview.classList.remove("is-visible");
  }

  dirOpenBtn.addEventListener("click", abrirDirectorio);
  if (dirCloseBtn) dirCloseBtn.addEventListener("click", cerrarDirectorio);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dirOverlay.classList.contains("is-open")) {
      cerrarDirectorio();
    }
  });

  // Renderizar filtros dinámicos con recuento numérico entre paréntesis (e.g. (12) Todos)
  const tattoos = CONFIG_ZERO.galeriaTattoos || [];
  const categoriasMap = {
    all: { es: "Todas las Disciplinas", en: "All Disciplines", count: tattoos.length },
    "fine-line": { es: "Fine Line", en: "Fine Line", count: 0 },
    "realismo-sombra": { es: "Realismo Sombra", en: "Black & Grey", count: 0 },
    "realismo-color": { es: "Realismo Color", en: "Color Realism", count: 0 },
    lettering: { es: "Lettering", en: "Lettering", count: 0 },
    tradicional: { es: "Tradicional", en: "Traditional", count: 0 },
    neotradicional: { es: "Neotradicional", en: "Neo-Traditional", count: 0 },
    "black-work": { es: "Black Work", en: "Black Work", count: 0 }
  };

  tattoos.forEach((item) => {
    if (categoriasMap[item.categoria]) {
      categoriasMap[item.categoria].count++;
    }
  });

  let filtroDirectorio = "all";

  function renderizarFiltrosDirectorio() {
    if (!dirFiltersContainer) return;
    dirFiltersContainer.innerHTML = Object.keys(categoriasMap)
      .map((catKey) => {
        const cat = categoriasMap[catKey];
        const label = idiomaActual === "es" ? cat.es : cat.en;
        const isActive = filtroDirectorio === catKey ? "active" : "";
        return `
          <li>
            <button type="button" class="viv-dir-filter-btn ${isActive}" data-dirfilter="${catKey}">
              <span>${label}</span>
              <span class="filter-count">(${cat.count})</span>
            </button>
          </li>
        `;
      })
      .join("");

    dirFiltersContainer.querySelectorAll(".viv-dir-filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        dirFiltersContainer.querySelectorAll(".viv-dir-filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        filtroDirectorio = btn.getAttribute("data-dirfilter") || "all";
        renderizarListaDirectorio();
      });
    });
  }

  function renderizarListaDirectorio() {
    const items = filtroDirectorio === "all"
      ? tattoos
      : tattoos.filter((t) => t.categoria === filtroDirectorio);

    dirListContainer.innerHTML = items
      .map((item) => {
        const titulo = idiomaActual === "es" ? item.tituloEs : item.tituloEn;
        const estilo = idiomaActual === "es" ? item.estiloEs : item.estiloEn;
        return `
          <li class="viv-dir-item" data-img="${item.imagen}" data-title="${titulo}" data-discipline="${estilo}">
            <span class="viv-dir-title">${titulo}</span>
            <span class="viv-dir-discipline">${estilo}</span>
          </li>
        `;
      })
      .join("");

    // Conectar eventos para el Hover Preview flotante y apertura de lightbox
    dirListContainer.querySelectorAll(".viv-dir-item").forEach((item) => {
      const img = item.getAttribute("data-img");
      const title = item.getAttribute("data-title");

      item.addEventListener("mouseenter", () => {
        if (floatPreview && floatImg && img) {
          floatImg.src = img;
          if (floatCaption) floatCaption.textContent = title;
          floatPreview.classList.add("is-visible");
        }
      });

      item.addEventListener("mouseleave", () => {
        if (floatPreview) floatPreview.classList.remove("is-visible");
      });

      item.addEventListener("click", () => {
        cerrarDirectorio();
        if (typeof abrirLightbox === "function") {
          abrirLightbox(img);
        }
      });
    });
  }

  // Movimiento suave del Floating Preview siguiendo el cursor
  window.addEventListener("mousemove", (e) => {
    if (floatPreview && floatPreview.classList.contains("is-visible")) {
      floatPreview.style.left = `${e.clientX + 20}px`;
      floatPreview.style.top = `${e.clientY + 20}px`;
    }
  });

  renderizarFiltrosDirectorio();
  renderizarListaDirectorio();
}


/* ==========================================================================
   DESVANECER FONDO DEL NAVBAR AL HACER SCROLL
   ========================================================================== */
function initNavbarScrollFade() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}


/* ==========================================================================
   LÓGICA DEL INTRO PRELOADER DE BIENVENIDA (Awwwards Style)
   ========================================================================== */
function initLuxuryPreloader(options = {}) {
  const config = {
    duration: options.duration || 2100,
    enableSessionStorage: options.enableSessionStorage !== false,
    sessionKey: options.sessionKey || "zeroTattooIntroSeen_v1",
    onComplete: options.onComplete || null
  };

  const preloader = document.getElementById("luxuryPreloader");
  if (!preloader) return;

  // 1. Si ya se vio en esta pestaña/sesión, removerlo inmediatamente
  if (config.enableSessionStorage) {
    try {
      if (sessionStorage.getItem(config.sessionKey) === "true") {
        preloader.remove();
        return;
      }
    } catch (e) {}
  }

  // 2. Bloquear scroll
  document.body.classList.add("preloader-locked");

  function finishPreloader() {
    preloader.classList.add("is-completed");

    if (config.enableSessionStorage) {
      try {
        sessionStorage.setItem(config.sessionKey, "true");
      } catch (e) {}
    }

    document.body.classList.remove("preloader-locked");

    if (typeof config.onComplete === "function") {
      config.onComplete();
    }

    setTimeout(() => {
      preloader.remove();
    }, 1100);
  }

  // Tiempo de revelado del logo antes del telón de salida (ej. 1.8s)
  setTimeout(finishPreloader, config.duration || 1800);
}
