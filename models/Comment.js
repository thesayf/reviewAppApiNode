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

CommentSchema.plugin(mongoosastic, {
    "host": "localhost",
    "port": 9200
});

module.exports = Comment = mongoose.model('Comment', CommentSchema);
