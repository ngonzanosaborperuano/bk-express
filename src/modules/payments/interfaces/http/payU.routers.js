import { PaymentController } from './PaymentController.js';

export class PayURouter {
    constructor() {
        this.paymentController = new PaymentController();
    }

    async register(app) {
        app.post('/api/payu/v1/checkout-url', this.paymentController.checkoutUrl.bind(this.paymentController));
    }
}