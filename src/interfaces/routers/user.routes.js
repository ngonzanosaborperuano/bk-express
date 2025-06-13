import passport from 'passport';
import { RateLimiters } from '../../middleware/applySensitiveRateLimiters.js';
import { AppCheckService } from '../../middleware/verificarAppCheck.js';
import { UserController } from '../controllers/user.controller.js';

export class UserRouter {
  constructor() {
    this.user = new UserController();
    this.rateLimiters = new RateLimiters();
    this.appCheck = new AppCheckService();
  }

  async register(app, upload) {
    this.rateLimiters.applySensitiveRateLimiters(app);

    app.post("/api/users/logout",
      passport.authenticate("jwt", { session: false }),
      this.appCheck.verificar.bind(this.appCheck),
      this.user.logout.bind(this.user)
    );

    app.get("/api/users/:email", this.appCheck.verificar.bind(this.appCheck), this.user.obtener.bind(this.user));
  }
}

//implentar express-validator