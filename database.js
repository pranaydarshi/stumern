const mongoose = require('mongoose')

const dbs = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollno: {
        type: String,
        required: true
    },
    phno: {
        type: Number,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    }



})
module.exports = mongoose.model("stuusers", dbs)
