import { RateLimiterFactory } from './rateLimiterFactory.js';

export class RateLimiterGlobal {
    constructor() {
        this.rateLimiterFactory = new RateLimiterFactory();
    }

    applyGlobalRateLimiter(app) {
        app.use(this.rateLimiterFactory.createDefaultLimiter());
    }

}
