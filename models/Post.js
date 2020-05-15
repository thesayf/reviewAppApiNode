const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    tags: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    lat: {
       type: Number,
       required: true
    },
    lon: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId, 
        ref: 'Comment'
    }],
    video: {
        type: String,
        required: true
    },
});

module.exports = Post = mongoose.model('Post', PostSchema);
