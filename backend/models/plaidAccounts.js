let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let plaidUserAccSchema = new Schema({
    // User_ID from userProfile that is automatically generated.
    userId: {
        type: String,
        required: true
    },
    // This is the PLAID ACCESS TOKEN that is created and assigned when a User registers.
    // ACCESS TOKEN does not expire. 
    accessToken: {
        type: String,
        required: true,
        unique: true
    },
    account_id: {
        type: String,
        required: true,
        unique: true
    },
    // Access: accounts.name
    accountName: {
        type: String,
        required: true
    },
    official_name: {
        type: String,
        required: true
    },
    // Users available balance to validate if user has enough in account to continue saving.
    availableBalance: {
        type: Number,
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