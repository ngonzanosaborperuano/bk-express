import passport from 'passport';
import * as UsersController from '../controllers/user.controller.js'; // Importa todo como objeto

const userRoutes = (app, upload) => {
  app.post("/api/users", UsersController.registerUser);
  app.post("/api/users/login", UsersController.login);
  app.post("/api/users/logout", passport.authenticate("jwt", { session: false }), UsersController.logout);
};

export default userRoutes;
