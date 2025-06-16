import crypto from 'crypto';
import PaymentRepository from '../repository/PaymentRepository.js'; //PaymentRepository

export default class PayuCheckoutService extends PaymentRepository {
    async createCheckout(payment) {
        const {
            amount,
            description,
            reference,
            buyerEmail
        } = payment;

        const merchantId = process.env.PAYU_MERCHANT_ID;
        const accountId = process.env.PAYU_ACCOUNT_ID;
        const apiKey = process.env.PAYU_API_KEY;
        const currency = 'PEN';
        const test = '1';
        const responseUrl = 'https://cocinando.shop/mp/webhook';
        const confirmationUrl = 'https://cocinando.shop/mp/notificacion';

        const signatureString = `${apiKey}~${merchantId}~${reference}~${amount}~${currency}`;
        const signature = crypto.createHash('md5').update(signatureString).digest('hex');

        const params = new URLSearchParams({
            merchantId,
            accountId,
            description,
            referenceCode: reference,
            amount,
            tax: '0',
            taxReturnBase: '0',
            currency,
            signature,
            test,
            buyerEmail,
            responseUrl,
            confirmationUrl
        });
        console.log(`${process.env.PAYU_URL}?${params.toString()}`);
        return `${process.env.PAYU_URL}?${params.toString()}`;
    }
}