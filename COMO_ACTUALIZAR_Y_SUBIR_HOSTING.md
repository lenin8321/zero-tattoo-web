# Guía Paso a Paso: Cómo Actualizar y Subir al Hosting tu Web de Zero Tattoo

¡Bienvenido a la guía de administración de tu sitio web **Zero Tattoo Colombia**!
El proyecto fue diseñado para que puedas cambiar fotos, videos, horarios, teléfonos o textos en español e inglés sin depender de nadie.

---

## 1. Estructura de Archivos de tu Proyecto

Dentro de tu carpeta `Zero Tatto` encontrarás todo organizado así:

* `index.html` → Es la página principal (haz doble clic sobre este archivo para abrir tu web en el navegador de tu Mac).
* `datos.js` → **El archivo más importante para ti.** Aquí están todos los textos (ES / EN), horarios, teléfonos, fotos del portafolio, fotos de clientes, videos y medios de pago.
* `styles.css` → Contiene los colores (negro profundo, dorado, verde esmeralda) y el diseño adaptable a celulares.
* `script.js` → Hace funcionar el botón de cambio de idioma **ES / EN**, el filtro de estilos de tatuajes y el visor de fotos en pantalla completa.
* `img/` → Carpeta donde están el logotipo (`logo.png`), el piercing con esmeraldas (`piercing-esmeraldas.png`), las fotos de tatuajes (`tattoo-1.png` a `tattoo-12.jpg`) y las fotos de clientes (`cliente-1.png` a `cliente-6.jpg`).
* `video/` → Carpeta donde están los videos en `.mp4` (`video-1.mp4` a `video-3.mp4`).

---

## 2. Cómo Cambiar Fotos o Agregar Tatuajes Nuevos

### Opción A: Reemplazar una foto existente (la forma más rápida)
1. Toma la foto nueva que quieras poner y cámbiale el nombre por el de una foto que ya esté en la carpeta `img/` (por ejemplo, `tattoo-4.jpg`).
2. Cópiala dentro de la carpeta `img/` y elige **"Reemplazar"**.
3. ¡Listo! Al recargar la página verás la foto nueva inmediatamente.

### Opción B: Agregar un tatuaje adicional a la galería
1. Copia tu foto nueva dentro de la carpeta `img/` (por ejemplo: `img/tattoo-13.jpg`).
2. Abre el archivo `datos.js` con cualquier editor de texto (TextEdit en Mac o Visual Studio Code).
3. Busca la sección `galeriaTattoos: [` y agrega un bloque nuevo copiando el formato de los anteriores:
   ```javascript
   {
     imagen: "img/tattoo-13.jpg",
     categoria: "black-work", // Opciones: "fine-line", "realismo-sombra", "realismo-color", "lettering", "tradicional", "neotradicional", "black-work"
     estiloEs: "Black Work",
     estiloEn: "Black Work",
     tituloEs: "Nuevo Diseño Black Work",
     tituloEn: "New Black Work Design"
   },
   ```
4. Guarda los cambios en `datos.js` y recarga tu navegador.

---

## 3. Cómo Cambiar Horarios, Teléfonos o Textos (Español / Inglés)

1. Abre el archivo `datos.js`.
2. Al inicio verás el bloque `contacto` (donde puedes cambiar el número de WhatsApp o enlaces de Instagram/Linktree) y el bloque `sedes` (donde puedes editar las direcciones u horarios de Medellín y Bogotá).
3. Más abajo verás el bloque `textos: { es: { ... }, en: { ... } }`, donde puedes modificar cualquier párrafo en español o inglés conservando las comillas `""`.

---

## 4. Cómo Subir tu Página Web a tu Servicio de Hosting

### Si tienes Hosting con cPanel, Hostinger, GoDaddy o DonWeb:
1. Entra al panel de control de tu hosting y abre el **Administrador de Archivos (File Manager)**.
2. Entra a la carpeta pública de tu dominio, llamada **`public_html`** (si hay un archivo `default.php` o `index.html` de bienvenida del proveedor, bórralo).
3. Sube el archivo comprimido `zero-tattoo-web.zip` (que ya dejé creado en tu carpeta) usando el botón **Subir / Upload**.
4. Haz clic derecho sobre `zero-tattoo-web.zip` dentro de `public_html` y selecciona **Extraer / Extract**.
5. ¡Tu página quedará en vivo en tu dominio al instante!

### Cuando quieras actualizar algo en el futuro en tu Hosting:
* Si solo cambiaste un texto o agregaste un ítem en `datos.js`, entra al Administrador de Archivos de tu hosting y sube únicamente el archivo `datos.js` nuevo (reemplazando el anterior).
* Si agregaste una foto nueva en `img/`, entra a la carpeta `public_html/img/` de tu hosting y sube esa foto.
