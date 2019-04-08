let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({

    //user id auto gen by mongo
    // This is the username stored that comes from Auth0
    usernameAuth: {
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
        required: "Password is Required",
        validate: [
            function (input) {
                return input.length >= 6;
            },
            "Password should be longer."
        ]
    },
    // This is the email stored that comes from Auth0
    emailAuth: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
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
    // wishList is an array of objects. The object it accepts is model wishItem.js.
    wishList: {
        type: Array
    },
    // plaidAccounts is an array of objects. The objects it accepts is model plaidAcc.js. 
    // In Plaid and Item = an Account. User might have multiple Items(Accounts).
    plaidAccounts: {
        type: Array,
    },
    // withdrawals is an array of objects. The object it accepts comes from stripeWithdrawal.js
    // These are records of the COMPLETED withdrawals.
    withdrawals: {
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
    userCreated: {
        type: Date,
        default: Date.now
    }
});

let User = mongoose.model("User", userSchema)

module.exports = User;
