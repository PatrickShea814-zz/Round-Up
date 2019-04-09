let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    //user id auto gen by mongo
    // This is the username stored that comes from Auth0
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    // This is the password stored that comes from Auth0
    password: {
        type: String,
        trim: true,
        required: true
    },
    // This is the email stored that comes from Auth0
    email: {
        type: String,
        unique: true
    },
    phoneNum: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    profilePicture: {
        type: String
    },
    // wishList is an array of objects. The object it accepts is model wishItem.js.
    wishList: {
        type: Array
    },
    // plaidItems is an array of objects. The object it accepts is model plaidItems.js
    // In Plaid an Item is a Bank or Institution. Each Item had its own Access_Token and Item_ID.
    // A User can have multiple Items(Accounts) connected.
    plaidItems: {
        type: Array
    },
    // plaidAccounts is an array of objects. The object it accepts is model plaidAccounts.js
    // In Plaid and Item(Bank Institution) can have multiple Accounts.
    plaidAccounts: {
        type: Array
    },
    // ACHAuth is an array of objects. The object it accepts is model plaidACHAuth.js
    plaidACHAuth: {
        type: Array
    },
    // deposits is an array of objects. The object it accepts comes from stripeDeposits.js
    // These are records of the COMPLETED deposits.
    deposits: {
        type: Array
    },
    currentBalance: {
        type: Number,
        trim: true
    },
    // withdrawals is an array of objects. The object it accepts comes from stripeWithdrawal.js
    // These are records of the COMPLETED withdrawals.
    withdrawals: {
        type: Array
    },
    // Date/Timestamp of User's initial registration.
    createDate: {
        type: Date,
        default: Date.now
    }
});

let User = mongoose.model("User", userSchema)

module.exports = User;
