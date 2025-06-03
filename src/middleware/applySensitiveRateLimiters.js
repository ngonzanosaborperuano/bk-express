import { UserController } from '../controllers/user.controller.js';
import { RateLimiterFactory } from '../middleware/rateLimiterFactory.js';


export class RateLimiters {

    constructor() {
        this.user = new UserController();
        this.rateLimiterFactory = new RateLimiterFactory();
    }

    async applySensitiveRateLimiters(app) {
        app.post("/api/users", this.rateLimiterFactory.createSignupLimiter(), this.user.register.bind(this.user));
        app.post("/api/users/login", this.rateLimiterFactory.createLoginLimiter(), this.user.login.bind(this.user));
    }
}
