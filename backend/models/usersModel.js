let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({

    //user id auto gen by mongo
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
    email: {
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
        },
        required: [true, 'A valid phone number required.']
    },
    connectedAccts: {
        type: String,
        trim: true
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
