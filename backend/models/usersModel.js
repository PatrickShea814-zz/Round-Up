let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    //user id auto gen by mongo
    
    user: [{
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
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
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
    }]
});

let User = mongoose.model("User", userSchema)

module.exports = User;
