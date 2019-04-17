let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let plaidItemsSchema = new Schema({
    // User_ID from userProfile that is automatically generated.
    userID: {
        type: String,
        required: true
    },
    institutionID: {
        type: String
    },
    accessToken: {
        type: String,
        required: true,
        unique: true
    },
    itemID: {
        type: String,
        required: true,
        unique: true
    }
});

let PlaidItems = mongoose.model("PlaidItems", plaidItemsSchema);

module.exports = PlaidItems;