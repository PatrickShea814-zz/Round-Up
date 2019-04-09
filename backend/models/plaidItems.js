let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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
    }
});

let PlaidItems = mongoose.model("PlaidItems", plaidItemsSchema);

module.exports = PlaidItems;