let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let plaidUserAccSchema = new Schema({
    // User_ID from userProfile that is automatically generated.
    userID: {
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

    stripeToken: {
        type: String,
        unique: true
    },
    // Access: accounts.name
    accountName: {
        type: String,
        required: true
    },
    // Last 4-Digits of a User's Item(Account)
    mask: {
        type: String,
        trim: true
    },
    // Access: accountsResponse.accounts.type
    // example: "depository"
    // Used for Auth
    type: {
        type: String,
        required: true,
    },
    // Access: accountsResponse.accounts.subtype
    // example: "checking"
    // Used for Auth
    subtype: {
        type: String,
        required: true
    }
});

let PlaidUserAccounts = mongoose.model("PlaidUserAccounts", plaidUserAccSchema);

module.exports = PlaidUserAccounts;