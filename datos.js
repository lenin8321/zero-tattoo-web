/**
 * ============================================================================
 * ARCHIVO DE CONFIGURACIÓN Y CONTENIDO — ZERO TATTOO (datos.js)
 * ============================================================================
 * ¡Hola! Desde este archivo puedes actualizar fácilmente los teléfonos,
 * horarios, textos en Español e Inglés, fotos del portafolio, fotos de clientes,
 * videos y medios de pago sin tocar la estructura complicada de la página.
 *
 * CÓMO CAMBIAR UNA FOTO:
 * 1. Guarda tu foto nueva dentro de la carpeta "img/" (ej: "img/mi-nuevo-tattoo.jpg").
 * 2. Busca abajo la lista "galeriaTattoos" o "galeriaClientes" y cambia la ruta.
 * 3. Guarda este archivo y recarga tu navegador.
 * ============================================================================
 */

const CONFIG_ZERO = {
  // 1. DATOS DE CONTACTO Y REDES SOCIALES
  contacto: {
    telefonoMostrar: "+57 316 358 9534",
    whatsappNumero: "573163589534",
    instagramUsuario: "@zerotattoocolombia",
    instagramUrl: "https://www.instagram.com/zerotattoocolombia/?hl=es-la",
    linktreeUrl: "https://linktr.ee/Zerotattoocol"
  },

  // 2. SEDES Y HORARIOS DE ATENCIÓN
  sedes: [
    {
      id: "medellin",
      ciudad: "MEDELLÍN",
      zonaEs: "El Poblado, Provenza",
      zonaEn: "El Poblado, Provenza",
      direccionEs: "Cra. 35 #7-24, Piso 2",
      direccionEn: "Cra. 35 #7-24, 2nd Floor",
      horarioEs: "Domingo a domingo: 10:00 a. m. – 1:00 a. m.",
      horarioEn: "Sunday to Sunday: 10:00 AM – 1:00 AM",
      mapaUrl: "https://www.google.com/maps/search/?api=1&query=Cra+35+%237-24+Provenza+El+Poblado+Medellin",
      whatsappMensajeEs: "Hola Zero Tattoo, quiero cotizar o agendar en la sede de Medellín (Provenza).",
      whatsappMensajeEn: "Hi Zero Tattoo, I'd like to get a quote or book at the Medellín (Provenza) studio."
    },
    {
      id: "bogota",
      ciudad: "BOGOTÁ D.C.",
      zonaEs: "Centro Comercial Bazar, 20 de Julio",
      zonaEn: "Bazar Shopping Center, 20 de Julio",
      direccionEs: "Cra. 6.ª, Cl. 25 Sur #20, Local 101",
      direccionEn: "Cra. 6a, Cl. 25 Sur #20, Suite 101",
      horarioEs: "Domingo a domingo: 10:00 a. m. – 8:00 p. m.",
      horarioEn: "Sunday to Sunday: 10:00 AM – 8:00 PM",
      mapaUrl: "https://www.google.com/maps/search/?api=1&query=Centro+Comercial+Bazar+20+de+Julio+Bogota",
      whatsappMensajeEs: "Hola Zero Tattoo, quiero cotizar o agendar en la sede de Bogotá (20 de Julio).",
      whatsappMensajeEn: "Hi Zero Tattoo, I'd like to get a quote or book at the Bogotá (20 de Julio) studio."
    }
  ],

  // 3. PORTAFOLIO DE TATUAJES (Puedes agregar, quitar o cambiar fotos aquí)
  // Categorías válidas para el filtro:
  // "fine-line" | "realismo-sombra" | "realismo-color" | "lettering" | "tradicional" | "neotradicional" | "black-work"
  galeriaTattoos: [
    {
      imagen: "img/tattoo-4.jpg",
      categoria: "lettering",
      estiloEs: "Realismo Sombra & Lettering",
      estiloEn: "Black & Grey Realism & Lettering",
      tituloEs: "Memento Mori · Memento Vivere",
      tituloEn: "Memento Mori · Memento Vivere"
    },
    {
      imagen: "img/tattoo-5.jpg",
      categoria: "fine-line",
      estiloEs: "Fine Line & Micro Color",
      estiloEn: "Fine Line & Micro Color",
      tituloEs: "Koi & Flores de Cerezo",
      tituloEn: "Koi Fish & Cherry Blossoms"
    },
    {
      imagen: "img/tattoo-6.jpg",
      categoria: "black-work",
      estiloEs: "Black Work",
      estiloEn: "Black Work",
      tituloEs: "Máscara Hannya en Luna Creciente",
      tituloEn: "Crescent Moon Hannya Mask"
    },
    {
      imagen: "img/tattoo-1.png",
      categoria: "realismo-color",
      estiloEs: "Realismo Color & Cómic",
      estiloEn: "Color Realism & Comic Pop",
      tituloEs: "Arte Pop “¡BOOM!” Full Color",
      tituloEn: "Full Color Pop Art “BOOM!”"
    },
    {
      imagen: "img/tattoo-2.png",
      categoria: "realismo-sombra",
      estiloEs: "Realismo Sombra",
      estiloEn: "Black & Grey Realism",
      tituloEs: "Composición Angelical en Sombras",
      tituloEn: "Black & Grey Angelic Composition"
    },
    {
      imagen: "img/tattoo-7.jpg",
      categoria: "neotradicional",
      estiloEs: "Neotradicional & Black Work",
      estiloEn: "Neo-Traditional & Black Work",
      tituloEs: "Sol Hannya Oriental",
      tituloEn: "Oriental Hannya Sun"
    },
    {
      imagen: "img/tattoo-3.png",
      categoria: "fine-line",
      estiloEs: "Fine Line & Botánico",
      estiloEn: "Fine Line & Botanical",
      tituloEs: "Lirio Botánico en Trazo Fino",
      tituloEn: "Fine Line Botanical Lily"
    },
    {
      imagen: "img/tattoo-8.jpg",
      categoria: "tradicional",
      estiloEs: "Tradicional & Anime Ink",
      estiloEn: "Traditional & Anime Ink",
      tituloEs: "Jolly Roger · Sombrero de Paja",
      tituloEn: "Straw Hat Jolly Roger"
    },
    {
      imagen: "img/tattoo-9.jpg",
      categoria: "black-work",
      estiloEs: "Black Work & Ornamental",
      estiloEn: "Black Work & Ornamental",
      tituloEs: "Ornamental de Oreja & Serpiente",
      tituloEn: "Ear Ornamental & Serpent"
    },
    {
      imagen: "img/tattoo-10.jpg",
      categoria: "realismo-sombra",
      estiloEs: "Realismo Sombra",
      estiloEn: "Black & Grey Realism",
      tituloEs: "Pieza de Autor en Sombras",
      tituloEn: "Custom Black & Grey Piece"
    },
    {
      imagen: "img/tattoo-11.jpg",
      categoria: "neotradicional",
      estiloEs: "Neotradicional",
      estiloEn: "Neo-Traditional",
      tituloEs: "Diseño Personalizado Zero",
      tituloEn: "Zero Custom Design"
    },
    {
      imagen: "img/tattoo-12.jpg",
      categoria: "realismo-color",
      estiloEs: "Realismo Color & Detalle",
      estiloEn: "Color Realism & Detail",
      tituloEs: "Arte Corporal de Alta Precisión",
      tituloEn: "High-Precision Body Art"
    }
  ],

  // 4. GALERÍA DE CLIENTES Y EXPERIENCIA EN EL ESTUDIO
  galeriaClientes: [
    {
      imagen: "img/cliente-1.png",
      tituloEs: "Tatuajes en Pareja · Provenza",
      tituloEn: "Couple Tattoos · Provenza"
    },
    {
      imagen: "img/cliente-2.png",
      tituloEs: "Amigas en Sesión · Zero Tattoo",
      tituloEn: "Friends Tattoo Session · Zero Tattoo"
    },
    {
      imagen: "img/cliente-3.png",
      tituloEs: "Experiencia Walk-In con Amigos",
      tituloEn: "Walk-In Experience with Friends"
    },
    {
      imagen: "img/cliente-4.jpg",
      tituloEs: "Clientes Felices · Medellín & Bogotá",
      tituloEn: "Happy Clients · Medellín & Bogotá"
    },
    {
      imagen: "img/cliente-5.jpg",
      tituloEs: "Sesión Personalizada en Estudio",
      tituloEn: "Custom Studio Session"
    },
    {
      imagen: "img/cliente-6.jpg",
      tituloEs: "Arte y Cultura Urbana Zero",
      tituloEn: "Zero Art & Urban Culture"
    }
  ],

  // 5. VIDEOS DEL ESTUDIO EN ACCIÓN
  videosEstudio: [
    {
      archivo: "video/video-1.mp4",
      poster: "img/studio-interior.png",
      tituloEs: "Sesión en Vivo · Precisión y Bioseguridad",
      tituloEn: "Live Session · Precision & Biosafety"
    },
    {
      archivo: "video/video-2.mp4",
      poster: "img/studio-shadows.png",
      tituloEs: "Arte en la Piel · Proceso Creativo",
      tituloEn: "Art on Skin · Creative Process"
    },
    {
      archivo: "video/video-3.mp4",
      poster: "img/hero-studio.png",
      tituloEs: "Ambiente Zero Tattoo · Cultura Urbana",
      tituloEn: "Zero Tattoo Vibe · Urban Culture"
    }
  ],

  // 6. RESEÑAS DESTACADAS DE CLIENTES
  resenas: [
    {
      nombre: "Camila R.",
      ubicacionEs: "Medellín · Provenza",
      ubicacionEn: "Medellín · Provenza",
      estrellas: 5,
      textoEs: "Llegamos sin cita previa (Walk-in) en Provenza y la atención fue increíble. El estudio es impecable, súper estéril y mi tatuaje en línea fina quedó perfecto.",
      textoEn: "We walked in without an appointment in Provenza and the service was amazing. The studio is spotless, super sterile, and my fine line tattoo turned out perfect."
    },
    {
      nombre: "Marcus T.",
      ubicacionEs: "Miami, USA (Visita en Medellín)",
      ubicacionEn: "Miami, USA (Visited Medellín)",
      estrellas: 5,
      textoEs: "Más de 23 años de experiencia se notan de inmediato. Me hice una pieza de realismo sombra y compré joyería con esmeraldas colombianas. Nivel internacional.",
      textoEn: "Over 23 years of experience really shows. Got a black & grey realism piece and bought Colombian emerald piercing jewelry. World-class studio."
    },
    {
      nombre: "Andrés Felipe M.",
      ubicacionEs: "Bogotá · 20 de Julio",
      ubicacionEn: "Bogotá · 20 de Julio",
      estrellas: 5,
      textoEs: "Excelente asesoría desde el diseño hasta los cuidados posteriores. Reciben todos los medios de pago y el ambiente del estudio es brutal.",
      textoEn: "Excellent guidance from custom design to aftercare. They accept all payment methods and the studio vibe is unmatched."
    }
  ],

  // 7. TODOS LOS MEDIOS DE PAGO DISPONIBLES
  mediosDePago: [
    {
      icono: "💳",
      tituloEs: "Tarjetas Débito y Crédito",
      tituloEn: "Credit & Debit Cards",
      detalleEs: "Visa, Mastercard, American Express, Codensa y Diners Club (Pagos sin contacto / Contactless)",
      detalleEn: "Visa, Mastercard, American Express & Diners Club (Contactless / Tap to Pay)"
    },
    {
      icono: "📲",
      tituloEs: "Billeteras Digitales Colombia",
      tituloEn: "Colombian Digital Wallets",
      detalleEs: "Nequi, Daviplata, Dale!, Movii y Transfiya al instante",
      detalleEn: "Instant transfers via Nequi, Daviplata, Dale! & Transfiya"
    },
    {
      icono: "🏦",
      tituloEs: "Transferencias Bancarias y PSE",
      tituloEn: "Bank Transfers & QR Code",
      detalleEs: "Transferencia directa Bancolombia, Código QR Bancolombia y PSE",
      detalleEn: "Direct Bancolombia transfer, Bancolombia QR Code & PSE"
    },
    {
      icono: "💵",
      tituloEs: "Efectivo Nacional y Divisas",
      tituloEn: "Cash (COP, USD & EUR)",
      detalleEs: "Pesos Colombianos (COP), Dólares (USD) y Euros (EUR) en nuestras sedes",
      detalleEn: "Colombian Pesos (COP), US Dollars (USD) & Euros (EUR) accepted in-studio"
    },
    {
      icono: "🌍",
      tituloEs: "Pagos Internacionales y Wallets",
      tituloEn: "International & Mobile Pay",
      detalleEs: "Apple Pay, Google Pay, enlaces de pago internacional y transferencias para turistas",
      detalleEn: "Apple Pay, Google Pay & international payment links for travelers"
    }
  ],

  // 8. TEXTOS BILINGÜES DE LA PÁGINA (ESPAÑOL E INGLÉS)
  textos: {
    es: {
      navServicios: "SERVICIOS",
      navPortafolio: "PORTAFOLIO",
      navNosotros: "NOSOTROS",
      navPrecios: "PRECIOS",
      navContacto: "CONTACTO",
      navPagos: "PAGOS",
      navCotizar: "AGENDAR",
      navEstilos: "PORTAFOLIO",
      navPiercing: "Piercing & Joyería",
      navHistoria: "NOSOTROS",
      navSedes: "CONTACTO",
      heroBadge: "MÁS DE 23 AÑOS DE TRAYECTORIA · MEDELLÍN & BOGOTÁ",
      heroSubtitulo: "TATTOO · PIERCING · LUXURY JEWELRY · SMOKE SHOP · VAPE",
      heroDescripcion: "En ZeroTattoo encuentras un espacio donde el arte, la expresión y el estilo se unen. Ofrecemos una experiencia integral que combina tatuajes personalizados, piercing, joyería premium con diseños exclusivos y esmeraldas colombianas, además de una selección de accesorios de Smoke Shop y productos Vape.",
      heroBtnPrimario: "Cotizar por WhatsApp",
      heroBtnSecundario: "Ver Portafolio",
      walkinBadge: "ATENCIÓN SIN CITA PREVIA",
      walkinTitulo: "TATTOO WALK-INS · ¡No necesitas cita para tatuarte!",
      walkinTexto: "Recibimos clientes sin reserva previa todos los días. Visítanos en cualquiera de nuestras sedes en Medellín (Provenza) o Bogotá (20 de Julio) y nuestro equipo te ayudará a conocer los diseños disponibles, consultar con nuestros artistas y encontrar la opción ideal para ti.",
      walkinBtn: "Visitar Sede o Escribir Ahora",
      serviciosTag: "EXPERIENCIA INTEGRAL ZERO",
      serviciosTitulo: "NUESTROS SERVICIOS",
      serviciosIntro: "Cinco líneas especializadas bajo un mismo sello de calidad, bioseguridad y cultura urbana.",
      srv1Titulo: "Tattoo Personalizado",
      srv1Desc: "Cada tatuaje comienza con una asesoría personalizada para definir el diseño, la ubicación y los detalles de cada pieza con protocolos estrictos de higiene y bioseguridad.",
      srv2Titulo: "Body Piercing Profesional",
      srv2Desc: "Procedimientos precisos y seguros con instrumental esterilizado, materiales hipoalergénicos de grado implante y acompañamiento en tu cicatrización.",
      srv3Titulo: "Luxury Jewelry & Esmeraldas",
      srv3Desc: "Joyería corporal premium con diseños exclusivos en oro y auténticas esmeraldas colombianas para elevar tu estilo único.",
      srv4Titulo: "Smoke Shop & Vape",
      srv4Desc: "Selección curada de accesorios de Smoke Shop y productos Vape de las mejores marcas en el ambiente exclusivo de nuestras sedes.",
      estilosTag: "ARTE SOBRE LA PIEL",
      estilosTitulo: "ESTILOS DE TATUAJES & PORTAFOLIO",
      estilosIntro: "En ZeroTattoo convertimos ideas, historias y emociones en arte sobre la piel. Nuestro equipo de artistas domina diferentes estilos y técnicas, garantizando una experiencia profesional desde la asesoría inicial hasta los cuidados posteriores.",
      filtroTodos: "Todos",
      filtroFineLine: "Fine Line",
      filtroRealismoSombra: "Realismo Sombra",
      filtroRealismoColor: "Realismo Color",
      filtroLettering: "Lettering",
      filtroTradicional: "Tradicional",
      filtroNeotradicional: "Neotradicional",
      filtroBlackWork: "Black Work",
      piercingTag: "SEGURIDAD, PRECISIÓN Y LUJO",
      piercingTitulo: "BODY PIERCING & JOYERÍA CON ESMERALDAS COLOMBIANAS",
      piercingP1: "En ZeroTattoo ofrecemos un servicio profesional de Body Piercing, donde la estética, la precisión y la seguridad son nuestra prioridad. Realizamos cada procedimiento siguiendo protocolos de higiene y bioseguridad, con instrumental esterilizado, materiales adecuados y condiciones sanitarias que buscan proteger tu bienestar.",
      piercingP2: "Complementa tu perforación con nuestra línea de Luxury Jewelry: piezas exclusivas elaboradas con oro y esmeraldas colombianas certificadas.",
      piercingCheck1: "Instrumental 100% esterilizado y agujas de un solo uso",
      piercingCheck2: "Joyería exclusiva con esmeraldas colombianas y titanio grado implante",
      piercingCheck3: "Asesoría anatómica y seguimiento post-procedimiento",
      piercingBtn: "Cotizar Piercing o Joyería",
      historiaTag: "23+ AÑOS DE ARTE Y CULTURA",
      historiaTitulo: "QUIENES SOMOS",
      historiaTexto: "Con más de 23 años de trayectoria, Zero Tattoo ha construido una historia alrededor del arte, la creatividad y la expresión personal. A lo largo de los años, hemos evolucionado para ofrecer una experiencia integral que reúne tatuajes, piercing, joyería premium y cultura urbana, manteniendo nuestra pasión por el arte y el compromiso con cada cliente. Hoy seguimos creciendo, conectando culturas y llevando el estilo Zero a nuevos destinos.",
      stat1Num: "23+",
      stat1Label: "Años de Trayectoria",
      stat2Num: "2",
      stat2Label: "Sedes (Medellín & Bogotá)",
      stat3Num: "7",
      stat3Label: "Estilos Especializados",
      stat4Num: "100%",
      stat4Label: "Bioseguridad Garantizada",
      videosTag: "EL ESTUDIO EN ACCIÓN",
      videosTitulo: "VIDEOS & SESIONES ZERO TATTOO",
      videosIntro: "Vive de cerca el proceso creativo, la higiene profesional y la energía de nuestras sedes.",
      clientesTag: "COMUNIDAD ZERO",
      clientesTitulo: "NUESTROS CLIENTES & RESEÑAS",
      clientesIntro: "Miles de clientes locales e internacionales confían en nuestras manos para llevar el arte de Zero Tattoo en su piel.",
      sedesTag: "VISÍTANOS TODOS LOS DÍAS",
      sedesTitulo: "SEDES Y HORARIOS DE ATENCIÓN",
      sedesIntro: "Atendemos de domingo a domingo con cita previa o modalidad Walk-In (sin cita).",
      btnComoLlegar: "Ver en Google Maps",
      btnAgendarSede: "Agendar en esta Sede",
      pagosTag: "FACILIDAD Y SEGURIDAD",
      pagosTitulo: "TODOS LOS MEDIOS DE PAGO",
      pagosIntro: "Para tu comodidad, recibimos todos los métodos de pago nacionales e internacionales en nuestras sedes de Medellín y Bogotá.",
      footerTexto: "Arte, expresión personal, joyería con esmeraldas colombianas y cultura urbana con más de 23 años de historia.",
      footerDerechos: "© 2026 Zero Tattoo Colombia. Todos los derechos reservados."
    },
    en: {
      navServicios: "SERVICES",
      navPortafolio: "PORTFOLIO",
      navNosotros: "ABOUT US",
      navPrecios: "PRICING",
      navContacto: "CONTACT",
      navPagos: "PAYMENTS",
      navCotizar: "BOOK",
      navEstilos: "PORTFOLIO",
      navPiercing: "Piercing & Jewelry",
      navHistoria: "ABOUT US",
      navSedes: "CONTACT",
      heroBadge: "OVER 23 YEARS OF EXPERIENCE · MEDELLÍN & BOGOTÁ",
      heroSubtitulo: "TATTOO · PIERCING · LUXURY JEWELRY · SMOKE SHOP · VAPE",
      heroDescripcion: "At ZeroTattoo, art, self-expression, and style come together. We offer a complete experience featuring custom tattoos, body piercing, premium jewelry with exclusive designs and Colombian emeralds, as well as a curated selection of Smoke Shop accessories and Vape products.",
      heroBtnPrimario: "Get a Quote on WhatsApp",
      heroBtnSecundario: "Explore Portfolio",
      walkinBadge: "NO APPOINTMENT NEEDED",
      walkinTitulo: "TATTOO WALK-INS · Walk-Ins Welcome Every Day!",
      walkinTexto: "You don’t need an appointment to get a tattoo; we welcome walk-ins daily. Visit us at any of our locations in Medellín (Provenza) or Bogotá (20 de Julio), and our team will help you explore available designs, consult with our artists, and find the perfect option for you.",
      walkinBtn: "Visit Us or Message Now",
      serviciosTag: "COMPLETE ZERO EXPERIENCE",
      serviciosTitulo: "OUR SERVICES",
      serviciosIntro: "Five specialized lines under one standard of artistic excellence, biosafety, and urban culture.",
      srv1Titulo: "Custom Tattoos",
      srv1Desc: "Every tattoo begins with a consultation to define the design, placement, and details of each piece, following strict hygiene and biosafety protocols.",
      srv2Titulo: "Professional Body Piercing",
      srv2Desc: "Safe, precise procedures using sterilized instruments, implant-grade hypoallergenic materials, and full aftercare guidance.",
      srv3Titulo: "Luxury Jewelry & Emeralds",
      srv3Desc: "Premium body jewelry featuring exclusive gold designs and authentic Colombian emeralds to elevate your personal style.",
      srv4Titulo: "Smoke Shop & Vape",
      srv4Desc: "Curated selection of premium Smoke Shop accessories and top-tier Vape products available at our studios.",
      estilosTag: "ART ON SKIN",
      estilosTitulo: "TATTOO STYLES & PORTFOLIO",
      estilosIntro: "At ZeroTattoo, we turn ideas, stories, and emotions into art on skin. Our team of tattoo artists works across different styles and techniques, providing a professional experience from the initial consultation to aftercare.",
      filtroTodos: "All Styles",
      filtroFineLine: "Fine Line",
      filtroRealismoSombra: "Black & Grey Realism",
      filtroRealismoColor: "Color Realism",
      filtroLettering: "Lettering",
      filtroTradicional: "Traditional",
      filtroNeotradicional: "Neo-Traditional",
      filtroBlackWork: "Black Work",
      piercingTag: "SAFETY, PRECISION & LUXURY",
      piercingTitulo: "BODY PIERCING & COLOMBIAN EMERALD JEWELRY",
      piercingP1: "At Zero Tattoo, we offer professional body piercing services where aesthetics, precision, and safety come first. Every procedure follows strict hygiene and biosafety protocols, using sterilized instruments, appropriate materials, and sanitary conditions designed to protect your well-being.",
      piercingP2: "Elevate your piercing with our Luxury Jewelry collection: exclusive pieces crafted with gold and genuine Colombian emeralds.",
      piercingCheck1: "100% sterilized instruments and single-use needles",
      piercingCheck2: "Exclusive Colombian emerald jewelry & implant-grade titanium",
      piercingCheck3: "Anatomical consultation and dedicated aftercare support",
      piercingBtn: "Inquire About Piercing & Jewelry",
      historiaTag: "23+ YEARS OF ART & CULTURE",
      historiaTitulo: "OUR STORY & JOURNEY",
      historiaTexto: "With over 23 years of experience, Zero Tattoo has built its story around art, creativity, and self-expression. Over the years, we have evolved to offer a complete experience combining tattoos, body piercing, premium jewelry, and urban culture, while staying true to our passion for art and commitment to every client. Today, we continue to grow, connect cultures, and bring the Zero style to new destinations.",
      stat1Num: "23+",
      stat1Label: "Years of Experience",
      stat2Num: "2",
      stat2Label: "Studios (Medellín & Bogotá)",
      stat3Num: "7",
      stat3Label: "Specialized Styles",
      stat4Num: "100%",
      stat4Label: "Certified Biosafety",
      videosTag: "THE STUDIO IN ACTION",
      videosTitulo: "ZERO TATTOO VIDEOS & SESSIONS",
      videosIntro: "Experience our creative process, sterile environment, and urban energy up close.",
      clientesTag: "ZERO COMMUNITY",
      clientesTitulo: "OUR CLIENTS & REVIEWS",
      clientesIntro: "Thousands of local and international clients trust our artists to bring their vision to life.",
      sedesTag: "OPEN 7 DAYS A WEEK",
      sedesTitulo: "LOCATIONS & OPENING HOURS",
      sedesIntro: "Open Sunday to Sunday by appointment or Walk-In at both of our studios.",
      btnComoLlegar: "Open in Google Maps",
      btnAgendarSede: "Book at this Studio",
      pagosTag: "CONVENIENT & SECURE",
      pagosTitulo: "ALL PAYMENT METHODS ACCEPTED",
      pagosIntro: "For your convenience, we accept all local and international payment methods at our Medellín and Bogotá studios.",
      footerTexto: "Art, self-expression, Colombian emerald jewelry, and urban culture with over 23 years of history.",
      footerDerechos: "© 2026 Zero Tattoo Colombia. All rights reserved."
    }
  }
};
