import jwt from 'jsonwebtoken';
import keys from '../../../../config/keys.js';
import User from '../../infrastructure/persistence/user.js';
import UserService from '../../infrastructure/services/userService.js';


export class UserController {
  constructor() { }
  async register(req, res, next) {
    try {
      const user = req.body;

      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{16,}$/;
      const isValid = re.test(user.contrasena);
      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: 'La contraseña no cumple con los requisitos mínimos de seguridad.',
        });
      }

      const data = await UserService.createUser(user);

      return res.status(200).json({
        success: true,
        message: 'Bienvenido.',
        data: data,
      });
    } catch (error) {
      next(error)
    }
  };
  async login(req, res, next) {
    try {
      const email = req.body.email;
      const contrasena = req.body.contrasena;

      const myUser = await UserService.loginUser({ email, contrasena })
      if (!myUser) {
        return res.status(401).json({
          success: false,
          message: 'EL usuario no fue encontrado.'
        });
      }
      else {
        const token = jwt.sign({ id: myUser.id }, keys.secretOrKey, {
          expiresIn: 60 * 24 * 60 * 30, // 30 días expira el token
        });
        const data = {
          id: +myUser.id,
          nombreCompleto: myUser.nombre_completo,
          email: myUser.email,
          foto: myUser.foto,
          rol_id: myUser.rol_id,
          fechaCreacion: myUser.fecha_creacion,
          sessionToken: `${token}`,
        };
        await User.updateToken(myUser.id, `${token}`);
        return res.status(201).json({
          success: true,
          message: `Bienvenido ${myUser.nombre_completo}`,
          data: data,
        });
      }
      // else {
      //   return res.status(200).json({
      //     success: false,
      //     message: 'La contraseña es incorrecta.',
      //     data: data,
      //   });
      // }
    } catch (error) {
      next(error)
    }
  };
  async logout(req, res, next) {
    try {
      const id = req.body.id;
      await User.updateToken(id, null);
      return res.status(201).json({
        success: true,
        message: 'LA SESION HA EXPIRADO.',
        data: { 'id': 0 }
      });
    } catch (error) {
      next(error)
    }
  }
  async obtener(req, res, next) {
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
}
