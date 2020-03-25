const express = require('express');
const postController = require("./controllers/postController");
const userController = require('./controllers/userController')
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/postCreater', (req, res) => {
  res.render('postCreater')
})

// HOW TO DO BACKWARDS DB QUERIES
// const findUserThroughPost = () => {
//   Post.findOne({title: 'First Post'})
//   .populate('user')
//   .then(user => console.log(user.user.name))
// }
// findUserThroughPost()


postController(app);
userController(app)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("were connected to DB")
});
mongoose.connect('mongodb+srv://Rori:Ishaqsol1234@cluster0-mawms.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
app.listen(3000, () => console.log("waiting on port 3000"));