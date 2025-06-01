// middlewares/applySensitiveRateLimiters.js
import * as UsersController from '../controllers/user.controller.js';
import rateLimiterFactory from '../middleware/rateLimiterFactory.js';

export const applySensitiveRateLimiters = (app) => {
    app.post("/api/users", rateLimiterFactory.createSignupLimiter(), UsersController.register);
    app.post("/api/users/login", rateLimiterFactory.createLoginLimiter(), UsersController.login);
};
