const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosastic = require('mongoosastic');
const PostSchema = new Schema({
    tags: {
        type: Array, 
        es_type:'string'
    },
    geo_with_lat_lon: {
        geo_point: {
          type: String,
          es_type: 'geo_point'
        },
        lat: { type: Number },
        lon: { type: Number }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
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

PostSchema.plugin(mongoosastic, {
    "host": "localhost",
    "port": 9200
});

module.exports = Post = mongoose.model('Post', PostSchema);
