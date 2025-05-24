import bluebird from 'bluebird'; // Importando bluebird para manejar promesas
import dotenv from 'dotenv'; // Importando dotenv
import pgPromise from 'pg-promise'; // Importando pg-promise

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: './.env' });

// Configuración de opciones para pg-promise
const options = {
  promiseLib: bluebird,
  query: (e) => {
    console.log('🟢 Ejecutando consulta:', e.query);
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
  host: process.env.host,
  port: Number(process.env.port),
  database: process.env.database,
  user: process.env.user,
  password: process.env.password,
  // ssl: {
  //   rejectUnauthorized: false
  // },
};

// Crear la instancia de la base de datos usando pg-promise
const db = pgp(databaseConfig);

// Exportar la instancia de db usando ESM (import/export)
export default db;
