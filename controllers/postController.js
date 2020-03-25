const Post = require('../models/Post')
const User = require('../models/User')
const bodyParser = require('body-parser')
const postFactory = require('../factories/postFactory')
var jsonParser = bodyParser.json()

module.exports = (app) => {

    //INDEX POST
    app.get('/posts', async (req, res) => {
        try {
           const posts = await Post.find()
        }
        catch (err) {
            await res.json({error: "there seems to be an error with your request please visit https://www.freecodecamp.org/learn/ to learn how to code"})
        }
        res.send("all posts")
    })
    // SHOW POST
    app.get('/posts/:id', (req,res) => {
        res.send("one post")
    })

    // CREATE POST
    app.post('/posts', jsonParser, async (req, res) => {

        try{
            const post = await postFactory(req)
            const savedPost = await post.save()
            res.json(savedPost)
        }
        catch(err) {
            await res.json({error: "there seems to be an error with your request please visit https://www.freecodecamp.org/learn/ to learn how to code"})
        }

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