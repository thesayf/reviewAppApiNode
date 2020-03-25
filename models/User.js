const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    // _id: Schema.Types.ObjectId,
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
    }

})


module.exports = User = mongoose.model('User', UserSchema)