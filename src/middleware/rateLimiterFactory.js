// middlewares/rateLimiterFactory.js
import rateLimit from 'express-rate-limit';

export class RateLimiterFactory {
  constructor() { }
  createDefaultLimiter() {
    return rateLimit({
      windowMs: 60 * 1000,
      max: 100,
      message: 'Demasiadas peticiones. Intenta más tarde.',
      standardHeaders: true,
      legacyHeaders: false,
    });
  }

  createLoginLimiter() {
    return rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minuto
      max: 5,
      message: 'Demasiados intentos de login. Intenta en un minuto.',
      standardHeaders: true,
      legacyHeaders: false,
    });
  }

  createSignupLimiter() {
    return rateLimit({
      windowMs: 60 * 60 * 1000, // 1 hora
      max: 10,
      message: 'Demasiadas cuentas creadas desde esta IP. Intenta más tarde.',
      standardHeaders: true,
      legacyHeaders: false,
    });
  }
}

