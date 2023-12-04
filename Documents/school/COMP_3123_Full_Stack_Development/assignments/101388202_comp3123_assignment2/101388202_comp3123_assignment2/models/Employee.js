const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    _id: { 
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    first_name: {
        type: String,
        required: true,
        maxLength: 100
    },
    last_name: {
        type: String,
        required: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        maxLength: 25
    },
    salary: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model("Employee", employeeSchema);