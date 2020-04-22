const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosastic = require('mongoosastic');
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    followers: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        required: false
    },
    followed: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        required: false
    }

})

UserSchema.plugin(mongoosastic, {
    "host": "localhost",
    "port": 9200
});

module.exports = User = mongoose.model('User', UserSchema)