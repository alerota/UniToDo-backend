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
    }, 
    userId: {
        type: String
    }
})

const CategorySchema = mongoose.model('categories', categorySchema)
module.exports = CategorySchema