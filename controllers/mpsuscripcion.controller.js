import SuscriptionService from '../services/mpsuscripcion.service.js';

const suscriptionService = new SuscriptionService();

class SuscripcionController {
    constructor() { }

    async getSuscripcion(req, res, next) {
        try {
            const suscripcion = await suscriptionService.findSuscripcion(req.params.id);
            res.json(suscripcion);
        } catch (error) {
            next(error);
        }
    }

    async createSuscription(req, res, next) {
        try {
            const suscripcion = await suscriptionService.createSuscription(req.body);
            res.json(suscripcion);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async updateSuscripcion(req, res, next) {
        try {
            const { precio } = req.body;
            const { id } = req.params;
            const suscUpdate = await suscriptionService.updateSuscription(id, precio);
            res.json(suscUpdate);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}

export default SuscripcionController;
