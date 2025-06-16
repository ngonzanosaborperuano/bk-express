export default class PaymentUseCase {
    /**
     * @param {PaymentRepository} paymentRepo
     */
    constructor(paymentRepo) {
        this.paymentRepo = paymentRepo;
    }

    /**
     * @param {Payment} payment
     * @returns {Promise<string>} checkoutUrl
     */
    async execute(payment) {
        return this.paymentRepo.createCheckout(payment);
    }
}