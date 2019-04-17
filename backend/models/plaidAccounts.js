let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// PlaidUserAccounts are the individual Bank Accounts under an Institution (Plaid Item) that a User connects to Plaid.

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
    // Unique ID associated to each individual Bank Accounts that a User Connected.
    account_id: {
        type: String,
        required: true,
        unique: true
    },
    // Example) Tony's Checking
    accountName: {
        type: String,
        required: true
    },
    // Example) BofA Cash Back Rewards
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