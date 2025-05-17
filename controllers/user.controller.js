import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import keys from '../config/keys.js';

export const registerUser = async (req, res, next) => {
  try {
    const user = req.body;
    const data = await User.create(user);

    return res.status(200).json({
      success: true,
      message: 'Bienvenido.',
      data: data.id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error al registrar al usuario.  ${JSON.stringify(req.body)}`,
      error: error,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const dato = req.body.dato;
    const password = req.body.password;

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
        id: myUser.id,
        nombre_completo: myUser.nombre_completo,
        email: myUser.email,
        foto: myUser.foto,
        rol_id: myUser.rol_id,
        fecha_creacion: myUser.fecha_creacion,
        session_token: `JWT ${token}`,
      };
      await User.updateToken(myUser.id, `JWT ${token}`);
      return res.status(201).json({
        success: true,
        message: `Bienvenido ${myUser.name} ${myUser.lastname}`,
        data: data,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'La contraseña es incorrecta.',
        data: data,
      });
    }
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: 'Error al realizar login, por favor cerrar la app y volver a intentar.',
      error: error,
    });
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
    return res.status(501).json({
      success: false,
      message: 'Error al cerrar sesion.',
      error: error,
    });
  }
};
