const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosastic = require('mongoosastic');

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

module.exports = Comment = mongoose.model('Comment', CommentSchema);
