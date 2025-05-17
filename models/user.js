// En user.js
import db from '../db/connection.js';  // Asegúrate de usar import si también deseas usarlo en todo el código
import crypto from 'crypto';
import moment from 'moment-timezone';

const User = {};

User.create = (user) => {
  const fechaPeru = moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss');
  const contrasenaHasheada = crypto.createHash('md5').update(user.contrasena).digest('hex');

  const sql = `
    INSERT INTO usuarios (
      nombre_completo,
      email,
      contrasena,
      foto,
      fecha_creacion,
      fecha_actualizacion
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
  `;

  const values = [
    user.fullname,
    user.email,
    contrasenaHasheada,
    user.foto || null,
    fechaPeru,
    fechaPeru
  ];

  return db.one(sql, values);
}

User.findById = (id) => {
  const sql = `
    SELECT id,
           nombre_completo,
           email,
           contrasena,
           foto,
           rol_id,
           fecha_creacion 
      FROM usuarios
     WHERE id = $1
  `;
  return db.oneOrNone(sql, id);
}

User.isPasswordMatched = (userPassword, hash) => {
  const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
  return myPasswordHashed === hash;
}

User.findByEmail = (correo) => {
  const sql = `
    SELECT id,nombre_completo,email,contrasena,foto,rol_id,fecha_creacion
      FROM USUARIOS
     WHERE email = $1
       AND estado = true
  `;
  return db.oneOrNone(sql, correo);
}

User.updateToken = (id, token) => {
  const sql = ` 
  UPDATE usuarios SET SESSION_TOKEN= $2
  WHERE ID=$1 
  `;
  return db.none(sql, [
    id,
    token
  ]);
}

// Usamos export default para exportar el objeto User
export default User;
