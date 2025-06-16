export default class PaymentRepository {
    /**
     * @param {Payment} payment
     * @returns {Promise<string>} checkoutUrl
     */
    async createCheckout(payment) {
        throw new Error('Not implemented');
    }
}