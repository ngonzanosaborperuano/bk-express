import { UserController } from '../modules/users/interfaces/http/user.controller.js';
import { RateLimiterFactory } from './rateLimiterFactory.js';
import { AppCheckService } from './verificarAppCheck.js';

export class RateLimiters {

    constructor() {
        this.user = new UserController();
        this.rateLimiterFactory = new RateLimiterFactory();
        this.appCheck = new AppCheckService();
    }

    async applySensitiveRateLimiters(app) {
        app.post("/api/users", this.rateLimiterFactory.createSignupLimiter(), this.appCheck.verificar.bind(this.appCheck), this.user.register.bind(this.user));
        app.post("/api/users/login", this.rateLimiterFactory.createLoginLimiter(), /*this.appCheck.verificar.bind(this.appCheck),*/ this.user.login.bind(this.user));
    }
}
