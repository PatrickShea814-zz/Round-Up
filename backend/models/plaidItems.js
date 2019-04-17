let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// PlaidItems are the Bank Institutions that a User logs into and connects to Plaid.
// Example) Bank of America = Plaid Item

let plaidItemsSchema = new Schema({
    // User_ID from userProfile that is automatically generated.
    userId: {
        type: String,
        required: true
    },
    institutionName: {
        type: String
    },
    accessToken: {
        type: String,
        required: true,
        unique: true
    },
    itemId: {
        type: String,
        required: true,
        unique: true
    },
    // Array of objects from the plaidAccounts.js Schema/Model.
    // PlaidUserAccounts are the individual Bank Accounts under an Institution (Plaid Item) that a User connects to Plaid.
    // Join/Associate using the ACCESS_TOKEN as ACCESS_TOKEN is specific to the Plaid Item.
    itemAccounts: [PlaidUserAccounts]
});

let PlaidItems = mongoose.model("PlaidItems", plaidItemsSchema);

module.exports = PlaidItems;