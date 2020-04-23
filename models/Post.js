const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosastic = require('mongoosastic');
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
    comments: [{
        comment: { 
            type: String,
            required: true
         },
        commentator: {
            id:   {
                type: Schema.Types.ObjectId, ref: 'User',
                required: true
            }
        }
    }],
    tags: {
        type: Array,
        required: true
    },
    geo_with_lat_lon: {
        geo_point: {
          type: String,
          es_type: 'geo_point'
        },
        lat: { type: Number },
        lon: { type: Number }
    }
});

PostSchema.plugin(mongoosastic, {
    "host": "localhost",
    "port": 9200
});

module.exports = Post = mongoose.model('Post', PostSchema);
