export class DatosPagos {
    constructor({
        reason,
        payerEmail,
        backUrl,
        notificationUrl,
        autoRecurring
    }) {
        this.reason = reason;
        this.payerEmail = payerEmail;
        this.backUrl = backUrl;
        this.notificationUrl = notificationUrl;
        this.autoRecurring = autoRecurring;
    }

    toMPDatosPagosFormat() {
        return {
            reason: this.reason,
            payer_email: this.payerEmail,
            back_url: this.backUrl,
            notification_url: this.notificationUrl,
            auto_recurring: {
                frequency: this.autoRecurring.frequency,
                frequency_type: this.autoRecurring.frequencyType,
                transaction_amount: this.autoRecurring.transactionAmount,
                currency_id: this.autoRecurring.currencyId
            },
        };
    }
}