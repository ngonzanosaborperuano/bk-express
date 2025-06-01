import db from '../db/connection.js'; // Asegúrate de que la ruta sea correcta

export async function guardarLog({ metodo, ruta, cuerpo, respuesta_ms, estado_http, mensaje, error }) {
  try {
    const sql = `
      INSERT INTO logs (metodo, ruta, cuerpo, respuesta_ms, estado_http, mensaje, error)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    await db.none(sql, [
      metodo,
      ruta,
      cuerpo ? JSON.stringify(cuerpo) : null,
      respuesta_ms,
      estado_http,
      mensaje,
      error
    ]);
  } catch (err) {
    console.error('Fallo al guardar log:', err.message);
  }
}

