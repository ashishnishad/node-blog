const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });


module.exports = mongoose.model('Post', postSchema);