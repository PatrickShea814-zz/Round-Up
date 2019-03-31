const mongoose = require('mongoose')

let Schema = mongoose.Schema

const fields = {	'name': String}

let usersSchema = new Schema(fields)

module.exports = mongoose.model('users', usersSchema)
