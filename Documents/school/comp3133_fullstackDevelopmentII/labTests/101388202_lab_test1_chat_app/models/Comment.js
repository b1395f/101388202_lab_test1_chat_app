const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, ref: 'User', required: true 
    }, 
    message: { 
        type: String, required: true 
    },
    room: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    } 
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;