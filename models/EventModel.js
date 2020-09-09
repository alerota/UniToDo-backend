const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    category: {
        type: String
    },
    allDay: {
        type: Boolean
    }
}, {timestamps: true})

const EventSchema = mongoose.model('events', eventSchema)
module.exports = EventSchema