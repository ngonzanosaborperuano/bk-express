import rateLimiterFactory from './rateLimiterFactory.js';

export const applyGlobalRateLimiter = (app) => {
    app.use(rateLimiterFactory.createDefaultLimiter());
};
