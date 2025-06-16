export default class Payment {
    constructor({ amount, description, reference, buyerEmail }) {
        this.amount = amount;
        this.description = description;
        this.reference = reference;
        this.buyerEmail = buyerEmail;
    }
}