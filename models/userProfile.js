const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WishItem = require('./wishItem').schema;
const PlaidItems = require('./plaidItems').schema;
const PlaidUserAccounts = require('./plaidAccounts').schema;
const PlaidACHAuth = require('./plaidACHAuth').schema;
const StripeCustomer = require('./stripeCustomer').schema;
const StripeDepos = require('./stripeDeposits').schema;
const RoundedTrans = require('./roundedTrans').schema;
const StripeWithdrawal = require('./stripeWithdrawal').schema;
const WithdrawRequest = require('./withdrawRequest').schema;

let userSchema = new Schema({
    //user id auto gen by mongo
    name: {
        type: String,
        trim: true,
        required: false
    },
    // This is the password stored that comes from Auth0
    password: {
        type: String,
        trim: true,
        required: false
    },
    // This is the email stored that comes from Auth0
    email: {
        type: String,
        required: false
    },
    auth0_ID: {
        type: String,
        unique: true,
        require: true
    },
    phoneNum: {
        type: String
    },
    profilePicture: {
        type: String
    },
    // wishList is an array of objects. The object it accepts is model wishItem.js.
    wishList: [WishItem],
    // plaidItems is an array of objects. The object it accepts is model plaidItems.js
    // In Plaid an Item is a Bank or Institution. Each Item had its own Access_Token and Item_ID.
    // A User can have multiple Items(Accounts) connected.
    plaidItems: [PlaidItems],
    // plaidAccounts is an array of objects. The object it accepts is model plaidAccounts.js
    // In Plaid and Item(Bank Institution) can have multiple Accounts.
    plaidAccounts: [PlaidUserAccounts],
    // ACHAuth is an array of objects. The object it accepts is model plaidACHAuth.js
    plaidACHAuth: [PlaidACHAuth],
    // Stripe Created Customer Profile
    stripeCustomer: [StripeCustomer],
    // deposits is an array of objects. The object it accepts comes from stripeDeposits.js
    // These are records of the COMPLETED deposits.
    deposits: [StripeDepos],
    rounded: [RoundedTrans],
    currentBalance: {
        type: Number,
        trim: true
    },
    // withdrawalSuccess is an array of objects. The object it accepts comes from stripeWithdrawal.js
    // These are records of the COMPLETED withdrawals to the user.
    withdrawalSuccess: [StripeWithdrawal],
    // withdrawalRequest is an array of objects. The object it accepts comes from withdrawRequest.js
    // These are records of the REQUESTED withdrawals by the user.
    withdrawalRequest: [WithdrawRequest],
    // Date/Timestamp of User's initial registration.
    createDate: {
        type: Date,
        default: Date.now
    }
});

let User = mongoose.model("User", userSchema)

module.exports = User;
