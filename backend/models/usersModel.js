let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    //user id auto gen by mongo
    username: {
        type: String,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    connectedAccts: {
        type: String,
        trim: true
    },
    currentBalance: {
        type: Number,
        trim: true
    }
});

let User = mongoose.model("User", userSchema)

module.exports = User;
