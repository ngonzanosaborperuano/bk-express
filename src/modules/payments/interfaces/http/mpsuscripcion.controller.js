import SuscriptionService from '../../infrastructure/services/mpsuscripcion.service.js';

const suscriptionService = new SuscriptionService();

export class SuscripcionController {
    constructor() { }

    async get(req, res, next) {
        try {
            const suscripcion = await suscriptionService.find(req.params.id);
            res.json(suscripcion);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const suscripcion = await suscriptionService.create(req.body);
            res.json(suscripcion);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { precio } = req.body;
            const { id } = req.params;
            const suscUpdate = await suscriptionService.update(id, precio);
            res.json(suscUpdate);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}
