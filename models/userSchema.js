
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_on: {
        type: Date,
        default: Date.now,
    },
})



const userModel = mongoose.model('SignedUpUsers', userSchema)
module.exports = userModel