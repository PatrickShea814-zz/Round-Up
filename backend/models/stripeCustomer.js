let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let stripeCustomerSchema = new Schema({
    // User_ID from userProfile that is automatically generated.
    userId: {
        type: String
    },
    // stripeID = id in createCustomer
    stripeID: {
        type: String
    },
    created: {
        type: Number
    },
    // bankAccountTokens
    sources: {
        type: Array
    },
    sources_url: {
        type: String
    },
    subscriptions_url: {
        type: String
    }
});

let StripeCustomer = mongoose.model("StripeCustomer", stripeCustomerSchema);

module.exports = StripeCustomer;