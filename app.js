const express = require('express');
const postController = require("./controllers/postController");
const userController = require('./controllers/userController');
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection

app.get('/', (req, res) => {
    res.send("The REVIEW APP API Is Running")
});

postController(app);
userController(app);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("were connected to DB")
});
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0-mawms.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});
app.listen(3000, () => console.log("waiting on port 3000"));