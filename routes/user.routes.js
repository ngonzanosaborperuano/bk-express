import passport from 'passport';
import * as UsersController from '../controllers/user.controller.js'; // Importa todo como objeto
import { verificarAppCheck } from '../middleware/verificarAppCheck.js';

const userRoutes = (app, upload) => {
  app.post("/api/users", UsersController.register);
  app.post("/api/users/login", UsersController.login);
  app.post("/api/users/logout", passport.authenticate("jwt", { session: false }), verificarAppCheck, UsersController.logout);
  app.get("/api/users/:email", UsersController.obtener);
};

export default userRoutes;
