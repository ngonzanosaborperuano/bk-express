import jwt from 'jsonwebtoken';
import keys from '../config/keys.js';
import User from '../models/user.js';

export const register = async (req, res, next) => {
  try {
    const user = req.body;
    const data = await User.create(user);
    return res.status(200).json({
      success: true,
      message: 'Bienvenido.',
      data: data,
    });
  } catch (error) {
    next(error)
  }
};

export const login = async (req, res, next) => {
  try {
    const dato = req.body.email;
    const password = req.body.contrasena;

    let myUser = await User.findByEmail(dato);

    if (!myUser) {
      return res.status(401).json({
        success: false,
        message: 'EL usuario no fue encontrado.',
      });
    }

    if (User.isPasswordMatched(password, myUser.contrasena)) {
      const token = jwt.sign({ id: myUser.id, email: myUser.email }, keys.secretOrKey, {
        expiresIn: 60 * 24 * 60 * 30, // 30 días expira el token
      });
      const data = {
        id: +myUser.id,
        nombreCompleto: myUser.nombre_completo,
        email: myUser.email,
        foto: myUser.foto,
        rol_id: myUser.rol_id,
        fechaCreacion: myUser.fecha_creacion,
        sessionToken: `JWT ${token}`,
      };
      await User.updateToken(myUser.id, `JWT ${token}`);
      return res.status(201).json({
        success: true,
        message: `Bienvenido ${myUser.nombre_completo}`,
        data: data,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: 'La contraseña es incorrecta.',
        data: data,
      });
    }
  } catch (error) {
    next(error)
  }
};

export const logout = async (req, res, next) => {
  try {
    const id = req.body.id;
    await User.updateToken(id, null);
    return res.status(201).json({
      success: true,
      message: 'LA SESION HA EXPIRADO.',
    });
  } catch (error) {
    next(error)

  }
};

export const obtener = async (req, res, next) => {
  try {
    const email = req.params.email;
    const data = await User.findByEmail(email);
    if (!data) {
      return res.status(200).json({
        success: false,
        message: 'Usuario no encontrado.',
        data: { 'id': 0 }
      });
    }
    return res.status(201).json({
      success: true,
      message: 'Usuario encontrado.',
      data: { 'id': 1 }
    });
  } catch (error) {
    next(error)
  }
}
