import logger from '../utils/logger.utils.js';

export const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
};

export const logErrors = (err, req, res, next) => {
    console.error(err.stack);
    next(err);
}

export const clientErrorHandler = (err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    } else {
        next(err);
    }
}
