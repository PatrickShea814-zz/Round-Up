let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let stripeCustomerSchema = new Schema({
    // User_ID from userProfile that is automatically generated.
    userId: {
        type: String,
        required: true
    },

    stripeID: {
        type: String
    },

    created: {
        type: Number,
        required: true
    },

    stripeToken: {
        type: String,
        required: true
    },
    
    sourceURL: {
        type: String,
        required: true
    },
    subscriptionsURL: {
        type: String,
        required: true
    }
});

let StripeCustomer = mongoose.model("StripeCustomer", stripeCustomerSchema);

module.exports = StripeCustomer;