const Post = require('../models/Post')
const User = require('../models/User')
const bodyParser = require('body-parser')
const postFactory = require('../factories/postFactory')
const commentFactory = require('../factories/commentFactory')
var jsonParser = bodyParser.json()
const { Client } = require('@elastic/elasticsearch')
const client = new Client({node: 'http://localhost:9200/'})

module.exports = (app) => {

    //INDEX POST
    app.get('/posts', async (req, res) => {
        try {
           const posts = await Post.find().populate('user')
           res.json(posts)
        }
        catch (err) {
            console.log(err)
            await res.json({error: "there seems to be an error"})
        }
    })

    // SHOW POST
    app.get('/posts/:id', async (req , res) => {
        try {
            const post = await Post.findById({_id: req.params.id}).populate('user')
            res.json(post)
        }
        catch {
            await res.json({error: "there seems to be an error"})
        }
    })

      //VIEW ONE USERS POSTS
      app.get('/posts/user/:userId', async (req, res) => {
        try {
          const posts = await Post.find({user: req.params.userId}).populate('user')
          await res.json(posts)
        }
        catch {
            await res.json({error: "there seems to be an error"})
        }
    })

    // CREATE POST
    app.post('/posts', jsonParser, async (req, res) => {
        try{
            const post = await postFactory(req)
            const savedPost = await post.save()
            await res.json(savedPost)
        }
        catch(err) {
            console.log(err)
            await res.json({error: "there seems to be an error"})
        }
    })

    //DELETE POST
    app.delete('/posts/:id', async (req , res) => {
        console.log(req.params.id)
        try{
            const user = await Post.findOneAndRemove({ _id: req.params.id })
            await res.json(user)
        }
        catch{

        }
    })

    //SEARCH POSTS BY TAG
    app.post('/posts/search', jsonParser, async (req, res) => {
    try {
        const { body } = await client.search({
            index: 'posts',
            body: {
              query: {
                match: {
                    tags: {
                        query: req.body.query
                    }
                }
              }
            }
          })
          res.json(body.hits.hits)
    }
    catch(err) {
        console.log(err)
    }
    
    })

    //SEARCH POSTS BY LOCAITON
    app.post('/posts/search/geo', jsonParser, async (req, res) => {
        
        try{

            console.log(req.body.query)
            console.log(req.body.lat)
            console.log(req.body.lon)
            const { body } = await client.search({
                index: 'posts',
                body: {
                query: {
                    bool: {
                        must: {
                            match: {
                                tags: {
                                    query: req.body.query
                                }
                            }
                        },
                        filter: {
                          geo_distance: {
                              distance: "200km",
                              geo_with_lat_lon : {
                                  lat : req.body.lat,
                                  lon : req.body.lon
                              }
                          }
                        }
                    }
                }
                }
              })
        await res.json(body)
        }
        catch(err) {
            console.log(err)
        }

    })

    //ADD COMMENT 
    app.post('/comments', jsonParser, async (req, res) => {
        try{
            console.log(req.body)
            const comment = await commentFactory.comment(req)
            const post = await Post.findById(req.body.postId)
            const savedComment = await post.comments.addToSet(comment)
            await post.save()
            await res.json(savedComment)
        }
        catch(e) {
            res.send("there was an error")
            console.log(e)
        }
    })

}