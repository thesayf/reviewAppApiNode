const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
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

});

UserSchema.plugin(validator);

module.exports = User = mongoose.model('User', UserSchema);