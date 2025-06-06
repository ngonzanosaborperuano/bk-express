// En user.js
// import crypto from 'crypto';
import moment from 'moment-timezone';
import db from '../db/connection.js'; // Asegúrate de usar import si también deseas usarlo en todo el código

const User = {};

User.create = async (user) => {
  const fechaPeru = moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss');
  // const contrasenaHasheada = crypto.createHash('md5').update(user.contrasena).digest('hex');

  const sql = `SELECT crear_usuario($1, $2, $3, $4, $5)`;

  const values = [
    user.nombreCompleto,
    user.email,
    user.foto || null,
    user.contrasena,
    fechaPeru
  ];
  return db.one(sql, values).then((res) => {
    return { id: res.crear_usuario };
  });
}

User.findById = (id) => {
  const sql = `SELECT * FROM find_usuario_por_id($1)`;
  return db.oneOrNone(sql, id);
}

// User.isPasswordMatched = (userPassword, hash) => {
//   const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
//   return myPasswordHashed === hash;
// }

User.findByEmail = (correo) => {

  const sql = `SELECT * FROM find_usuario_por_email($1::text)`;
  return db.oneOrNone(sql, correo);
}

User.updateToken = (id, token) => {
  const sql = `select actualizar_session_token($1, $2)`;
  return db.result(sql, [id, token]);
}


// Usamos export default para exportar el objeto User
export default User;
