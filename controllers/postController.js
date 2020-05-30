const Post = require('../models/Post');
const bodyParser = require('body-parser');
const postFactory = require('../factories/postFactory');
const commentFactory = require('../factories/commentFactory');
const jsonParser = bodyParser.json();
const { Client } = require('@elastic/elasticsearch');
const ENV = require('dotenv').config();
const AWS = require('aws-sdk');
// const uuid = require('uuid');
// const client = new Client({
//   node: process.env.ELASTIC_SEARCH_ENDPOINT,
//   auth: {
//   username: process.env.AWS_ELASTIC_SEARCH_SERVICE_USERNAME,
//   password: process.env.AWS_ELASTIC_SEARCH_SERVICE_PASSWORD
// }
// });
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_S3_ID,
//   secretAccessKey: process.env.AWS_S3_SECRET
// });

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
    });

    // SHOW POST
    app.get('/posts/:id', async (req , res) => {
        try {
            const post = await Post.findById({_id: req.params.id}).populate('user')
            res.json(post)
        }
        catch(err){
            await res.json({error: "there seems to be an error"})
        }
    });

    //VIEW ONE USERS POSTS
      app.get('/posts/user/:userId', async (req, res) => {
        try {
          const posts = await Post.find({user: req.params.userId}).populate('user')
          await res.json(posts)
        }
        catch(err) {
            await res.json({error: "there seems to be an error"})
        }
    });

    // CREATE POST
    app.post('/posts', jsonParser, async (req, res) => {
        try{
            const post = await postFactory(req)
            const savedPost = await post.save()
            await res.json(savedPost)
            // const params = {
            //     Bucket: process.env.AWS_S3_BUCKETNAME,
            //     // Key: `${uuid()}.mp4`, // File name you want to save as in S3
            //     Body: req.body.videoUrl
            // };
            // await s3.upload(params, async function(err, data) {
            //     if (err) {
            //         throw err;
            //     }
            //     console.log(data)
            //     const post = await postFactory(req, data.Location)
            //     const savedPost = await post.save()
            //     // const { body } = await client.index({
            //     //     id: savedPost._id,
            //     //     index: 'posts',
            //     //     body: {
            //     //         title: savedPost.title,
            //     //         description: savedPost.description,
            //     //         tags: savedPost.tags,
            //     //         location: {
            //     //                 lat: savedPost.lat,
            //     //                 lon: savedPost.lon,
            //     // }
            //     //       },                        
            //     //   })
            //     await res.json(savedPost)
            // });
        }
        catch(err) {
            console.log(err)
            await res.json({error: "there seems to be an error"})
        }
    });

    //DELETE POST
    app.delete('/posts/:id', async (req , res) => {
        console.log(req.params.id)
        try{
            const user = await Post.findOneAndRemove({ _id: req.params.id })
            await res.json(user)
        }
        catch(err){
            console.log(err)
        }
    });

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
    
    });

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
                              location : {
                                  lat : req.body.lat,
                                  lon : req.body.lon
                              }
                          }
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
    });

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
    });

}