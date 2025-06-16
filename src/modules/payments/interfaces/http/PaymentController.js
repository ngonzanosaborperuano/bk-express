import PaymentUseCase from '../../application/PaymentUseCase.js';
import Payment from '../../domain/entities/Payment.js'; //Payment
import PayuCheckoutService from '../../infrastructure/services/PayuCheckoutService.js';


export class PaymentController {
    constructor() {
        this.paymentUseCase = new PaymentUseCase(new PayuCheckoutService());
    }

    async checkoutUrl(req, res) {
        const { amount, description, reference, buyerEmail } = req.body;
        const payment = new Payment({ amount, description, reference, buyerEmail });
        const checkoutUrl = await this.paymentUseCase.execute(payment);
        res.json({ checkoutUrl });
    }

}
