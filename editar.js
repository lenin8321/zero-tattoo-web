import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';

// La clave NO debe escribirse en el código. Defínela como variable de entorno antes de ejecutar:
//   PowerShell:  $env:GEMINI_API_KEY="tu_clave_nueva"; node editar.js
if (!process.env.GEMINI_API_KEY) {
  console.error("Falta la variable de entorno GEMINI_API_KEY.");
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function modificarWeb() {
  try {
    const archivoActual = fs.readFileSync('index.html', 'utf-8');
    const instruccion = "Agrega un botón flotante en la esquina inferior derecha con estilos modernos.";

    console.log("Enviando tu código a Gemini...");

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Eres un experto desarrollador frontend. Modifica el siguiente código HTML según esta instrucción: "${instruccion}". 
      
      IMPORTANTE: Devuelve ÚNICAMENTE el código HTML completo y actualizado, sin explicaciones ni bloques de texto adicionales fuera del código.

      CÓDIGO ACTUAL:
      ${archivoActual}`,
    });

    const nuevoCodigo = response.text;
    const codigoLimpiado = nuevoCodigo.replace(/```html/g, '').replace(/```/g, '').trim();

    fs.writeFileSync('index.html', codigoLimpiado, 'utf-8');
    console.log("¡Listo! Tu archivo index.html ha sido actualizado por Gemini.");
  } catch (error) {
    console.error("Hubo un error:", error);
  }
}

modificarWeb();