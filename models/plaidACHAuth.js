let mongoose = require('mongoose');
let Schema = mongoose.Schema;


// THIS MODEL IS NOT FOR PRODUCTION AND IS ONLY FOR TESTING PURPOSES. WE DO NOT WANT TO STORE THIS INFORMATION
let plaidACHAuthSchema = new Schema({
    // User_ID from userProfile that is automatically generated.
    userId: {
        type: String,
        required: true
    },
    // This is the PLAID ACCESS TOKEN that is created and assigned when a User registers.
    // ACCESS TOKEN does not expire. 
    accessToken: {
        type: String,
        required: true
    },
    account_id: {
        type: String,
        required: true,
        unique: true
    },
    // Bank Account Number
    // Access: authResponse.numbers.ach.account
    // Used for Stripe to initiate ACH Transactions
    accountNumber: {
        type: String,
        required: true
    },
    // Bank Routing Number
    // Access: authResponse.numbers.ach.routing
    // Used for Stripe to initiate ACH Transactions
    routing: {
        type: String,
        required: true
    },
    // Bank Wire Routing Number
    // Access: authResponse.numbers.ach.wire_routing
    // Used for Stripe to initiate ACH Transactions
    wire_routing: {
        type: String,
        required: true
    }
});

let PlaidACHAuth = mongoose.model("PlaidACHAuth", plaidACHAuthSchema);

module.exports = PlaidACHAuth;