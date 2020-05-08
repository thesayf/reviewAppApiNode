const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment')
const bodyParser = require('body-parser');
const postFactory = require('../factories/postFactory');
const commentFactory = require('../factories/commentFactory');
const jsonParser = bodyParser.json();
const { Client } = require('@elastic/elasticsearch');
const client = new Client({node: 'http://localhost:9200/'});
const AWS = require('aws-sdk');
const fs = require('fs');
const ID = 'AKIAIYG5J4BI67UQNYYA';
const SECRET = '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';
const BUCKET_NAME = 'roris-test-bucket';
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

module.exports = (app) => {

    //INDEX POST
    app.get('/posts', async (req, res) => {
        try {
           const posts = await Post.find()
           .populate('user')
           .populate({
            path: 'comments',
            populate: { path: 'user' }
          });
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
            const params = {
                Bucket: BUCKET_NAME,
                Key: 'pinky45.png', // File name you want to save as in S3
                Body: req.body.video_url
              };
            await s3.upload(params, async function(err, data) {
                if (err) {
                    throw err;
                }
                const post = await postFactory(req, data.Location)
                const savedPost = await post.save()
                await res.json(savedPost)
                // console.log(`File uploaded successfully. ${data.Location}`);
            });
            await console.log("this ran")

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
        const ids = []
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
        await body.hits.hits.map(post => {
              ids.push(post._id)
        })
        const posts = await Post.find({'_id': { $in: ids}}).populate('user')
        await res.json(posts)
    }
    catch(err) {
        console.log(err)
    }
    
    })

    //SEARCH POSTS BY LOCAITON
    app.post('/posts/search/geo', jsonParser, async (req, res) => {
        try{
            const ids = []
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
        // await res.json(body)
        await body.hits.hits.map(post => {
            ids.push(post._id)
        })
        const posts = await Post.find({'_id': { $in: ids}}).populate('user')
        await res.json(posts)
        }
        catch(err) {
            console.log(err)
        }

    })

    //ADD COMMENT 
    app.post('/comments', jsonParser, async (req, res) => {
        try{
            const comment = await commentFactory.comment(req)
            const savedComment = await comment.save()
            const post = await Post.findById(req.body.postId)
            console.log(savedComment)
            const updatedPost = await post.comments.addToSet(comment._id)
            await post.save()
            await res.json(updatedPost)
        }
        catch(e) {
            res.send("there was an error")
            console.log(e)
        }
    })

}