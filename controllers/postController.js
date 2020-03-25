const Post = require('../models/Post')
const User = require('../models/User')
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

module.exports = (app) => {

    //INDEX POST
    app.get('/posts', (req, res) => {
        res.send("all posts")
    })
    // SHOW POST
    app.get('/posts/:id', (req,res) => {
        res.send("one post")
    })

    // CREATE POST
    app.post('/posts', jsonParser, (req, res) => {
        console.log(req.body)
        
        const newPost = new Post({
            user: "5e7b7da5dcf15d3298402e77",
            title: req.body.title,
            description: req.body.description,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            videoURL: req.body.videoURL
        })

        newPost.save()
        .then(post => res.json(post))

    })

    //VIEW ONE USERS POST
    app.get('posts/:userId', (req, res) => {
        res.send("one users post")
    })

    // SEARCH POST BY TAGS
    app.get('posts/:tag', (req, res) => {
        res.send("all post with your tag")
    })

    //SEARCH POSTS BY LOCATION
    app.get('posts/:lat/:long', (req,res) => {
        res.send("all yout posts based on location")
    })


}