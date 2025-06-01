import bluebird from 'bluebird'; // Importando bluebird para manejar promesas
import pgPromise from 'pg-promise'; // Importando pg-promise
import { config } from '../config/config.js';

// Configuración de opciones para pg-promise
const options = {
  promiseLib: bluebird,
  query: (e) => {
    // console.log('🟢 Ejecutando consulta:', e.query);
  },
  error: (err, e) => {
    console.error('🔴 Error en consulta:', err);
  }
};


// Inicializar pg-promise
const pgp = pgPromise(options);

// Accediendo al objeto types de pg-promise
const types = pgp.pg.types;

// Establecer el analizador de tipo para el tipo de dato 1114 (timestamp)
types.setTypeParser(1114, function (stringValue) {
  return stringValue;  // Retornando el valor tal como está
});
// Configuración de la base de datos
const databaseConfig = {
  host: config.host,
  port: Number(config.port),
  database: config.database,
  user: config.user,
  password: config.password,
  // ssl: {
  //   rejectUnauthorized: false
  // },
};

// Crear la instancia de la base de datos usando pg-promise
const db = pgp(databaseConfig);

// Exportar la instancia de db usando ESM (import/export)
export default db;
