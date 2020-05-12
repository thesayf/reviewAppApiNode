const express = require('express');
const postController = require("./controllers/postController");
const userController = require('./controllers/userController')
const app = express();
const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic')
const db = mongoose.connection
const { Client } = require('@elastic/elasticsearch')
const client = new Client({node: 'http://localhost:9200/'})
const User = require('./models/User');
const Post = require('./models/Post');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send("hello world")
})

app.get('/postCreater', (req, res) => {
  res.render('postCreater')
})

postController(app, client);
userController(app);

User.createMapping((err, mapping) => {
  console.log('User Elastic Search Mapping Created');
  // console.log(mapping)
  // console.log(err)
});

Post.createMapping((err, mapping) => {
  console.log('Post Elastic Search Mapping Created');
  // console.log(mapping)
  // console.log(err)
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("were connected to DB")
});
mongoose.connect('mongodb+srv://Rori:Ishaqsol1234@cluster0-mawms.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
app.listen(3000, () => console.log("waiting on port 3000"));