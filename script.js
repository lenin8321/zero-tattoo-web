/**
 * ============================================================================
 * LÓGICA INTERACTIVA — ZERO TATTOO COLOMBIA (script.js)
 * ============================================================================
 */

let idiomaActual = "es";
let filtroActual = "all";

document.addEventListener("DOMContentLoaded", () => {
  // Menú móvil
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
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
    });
  });

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxClose = document.getElementById("lightboxClose");
  if (lightbox) lightbox.addEventListener("click", cerrarLightbox);
  if (lightboxClose) lightboxClose.addEventListener("click", cerrarLightbox);

  ["imgPiercingEsmeraldas", "heroMainFigure", "heroThumb1", "heroThumb2"].forEach((id) => {
    const imgEl = document.getElementById(id);
    if (imgEl) {
      imgEl.style.cursor = "pointer";
      imgEl.addEventListener("click", () => abrirLightbox(imgEl.getAttribute("src")));
    }
  });

  conectarEnlacesContacto();
  aplicarIdioma(idiomaActual);
});

function conectarEnlacesContacto() {
  const numWa = CONFIG_ZERO.contacto.whatsappNumero;
  const urlWaGeneral = `https://wa.me/${numWa}?text=${encodeURIComponent(
    "Hola Zero Tattoo, quiero cotizar un tatuaje o piercing."
  )}`;
  const urlWaPiercing = `https://wa.me/${numWa}?text=${encodeURIComponent(
    "Hola Zero Tattoo, quiero información sobre Body Piercing y Joyería con Esmeraldas Colombianas."
  )}`;

  ["navCtaWhatsapp", "heroBtnWa", "floatWaBtn", "footerWaBtn", "heroTopPhone"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.href = urlWaGeneral;
      el.target = "_blank";
      el.rel = "noopener";
    }
  });

  const piercingBtn = document.getElementById("piercingBtnWa");
  if (piercingBtn) {
    piercingBtn.href = urlWaPiercing;
    piercingBtn.target = "_blank";
    piercingBtn.rel = "noopener";
  }

  ["heroTopIg", "footerIgLink"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.href = CONFIG_ZERO.contacto.instagramUrl;
      el.target = "_blank";
      el.rel = "noopener";
    }
  });

  ["heroTopLinktree", "footerLinktreeLink"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.href = CONFIG_ZERO.contacto.linktreeUrl;
      el.target = "_blank";
      el.rel = "noopener";
    }
  });
}

function cambiarIdioma(nuevoIdioma) {
  idiomaActual = nuevoIdioma;
  document.documentElement.lang = nuevoIdioma;

  const btnEs = document.getElementById("btnLangEs");
  const btnEn = document.getElementById("btnLangEn");
  if (btnEs && btnEn) {
    btnEs.classList.toggle("active", nuevoIdioma === "es");
    btnEn.classList.toggle("active", nuevoIdioma === "en");
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
          <img src="${item.imagen}" alt="${titulo}" loading="lazy" />
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
        <article class="client-card" data-img="${cli.imagen}" style="cursor:pointer;">
          <img src="${cli.imagen}" alt="${titulo}" loading="lazy" />
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
          <div class="review-stars">${estrellas}</div>
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

  const txtMapa = CONFIG_ZERO.textos[idiomaActual].btnComoLlegar;
  const txtAgendar = CONFIG_ZERO.textos[idiomaActual].btnAgendarSede;

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
              <div class="kharkiv-meta-label"><img src="Icon/location.svg" class="meta-icon" alt="" /> DIRECCIÓN / ADDRESS</div>
              <div>${direccion}</div>
            </div>
            <div>
              <div class="kharkiv-meta-label"><img src="Icon/horario.svg" class="meta-icon" alt="" /> HORARIO / OPENING HOURS</div>
              <div>${horario}</div>
            </div>
            <div>
              <div class="kharkiv-meta-label"><img src="Icon/modalidad.svg" class="meta-icon" alt="" /> MODALIDAD / WALK-INS</div>
              <div>WALK-INS WELCOME · ${CONFIG_ZERO.contacto.telefonoMostrar}</div>
            </div>
          </div>
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <a href="${urlWa}" target="_blank" rel="noopener" class="btn-square-white"><img src="Icon/whatsapp.svg" class="btn-icon" alt="" /> ${txtAgendar} ↗</a>
            <a href="${sede.mapaUrl}" target="_blank" rel="noopener" class="btn-square-outline"><img src="Icon/location.svg" class="btn-icon icon-white" alt="" /> ${txtMapa} ↗</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderizarMediosDePago() {
  const contenedor = document.getElementById("paymentsGrid");
  if (!contenedor) return;

  contenedor.innerHTML = CONFIG_ZERO.mediosDePago
    .map((pago) => {
      const titulo = idiomaActual === "es" ? pago.tituloEs : pago.tituloEn;
      const detalle = idiomaActual === "es" ? pago.detalleEs : pago.detalleEn;
      return `
        <article class="payment-card">
          <div class="payment-icon">${pago.icono}</div>
          <h3>${titulo}</h3>
          <p>${detalle}</p>
        </article>
      `;
    })
    .join("");
}

function abrirLightbox(rutaImagen) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  if (lightbox && lightboxImg && rutaImagen) {
    lightboxImg.src = rutaImagen;
    lightbox.classList.add("open");
  }
}

function cerrarLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.classList.remove("open");
  }
}
