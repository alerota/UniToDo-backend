const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String
    },
    color: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    }
})

const CategorySchema = mongoose.model('categories', categorySchema)
module.exports = CategorySchema