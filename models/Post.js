const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    longitude: {
        type: mongoose.Decimal128,
        required: false
    },
    latitude: {
        type: mongoose.Decimal128,
        required: false
    }, 
    videoURL: {
        type: String,
        required: true
    }
});


module.exports = Post = mongoose.model('Post', PostSchema);
