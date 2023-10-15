const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { 
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    username: {
        type: String,
        required: true,
        maxLength: 100,
        unique: true
    },
    email: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxLength: 50
    }
});

module.exports = mongoose.model("User", userSchema);