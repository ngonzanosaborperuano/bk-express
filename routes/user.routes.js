import passport from 'passport';
import * as UsersController from '../controllers/user.controller.js';
import { applySensitiveRateLimiters } from '../middleware/applySensitiveRateLimiters.js';
import { verificarAppCheck } from '../middleware/verificarAppCheck.js';

const userRoutes = (app, upload) => {

  applySensitiveRateLimiters(app);

  app.post("/api/users/logout",
    passport.authenticate("jwt", { session: false }),
    verificarAppCheck,
    UsersController.logout
  );

  app.get("/api/users/:email", UsersController.obtener);
};

export default userRoutes;
