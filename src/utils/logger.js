import db from '../db/connection.js'; // Asegúrate de que la ruta sea correcta

export async function guardarLog({ metodo, ruta, cuerpo, respuesta_ms, estado_http, mensaje, error }) {
  try {
    const sql = `SELECT insertar_log($1, $2, $3, $4, $5, $6, $7)`;
    await db.one(sql, [
      metodo,
      ruta,
      cuerpo ? JSON.stringify(cuerpo) : null,
      respuesta_ms,
      estado_http,
      mensaje,
      error ? JSON.stringify(error) : null
    ]);
  } catch (err) {
    console.error('Fallo al guardar log:', err.message);
  }
}
export async function obtenerLogs(limit, metodo, estado_htp) {
  try {
    const sql = `SELECT * FROM obtener_logs($1, $2, $3)`;

    const logs = await db.any(sql, [limit, metodo, estado_htp]);

    return logs;
  } catch (err) {
    console.error('Fallo al obtener logs:', err.message);
    return [];
  }
}

