const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
}, {timestamps: true})

const UserModel = mongoose.model('users', userSchema)
module.exports = UserModel