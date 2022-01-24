const mongoose = require("mongoose")

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    cell_no: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("Users", User)