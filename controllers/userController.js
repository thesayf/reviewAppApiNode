// const mongoose = require('mongoose')
const User = require('../models/User');
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

module.exports = (app) => {

    app.post('/users', jsonParser, (req, res) => {
        console.log(req.body)
        console.log("user")
        const newUser = new User({
            // _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        newUser.save()
        .then(user => res.json({user: user}))
    })
}
