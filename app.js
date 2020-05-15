const express = require('express');
const postController = require("./controllers/postController");
const userController = require('./controllers/userController');
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection
const { Client } = require('@elastic/elasticsearch');
const client = new Client({
//   node: 'https://search-second-test-a4j4fj5gloerfo6mnlcvvtajka.eu-west-2.es.amazonaws.com',
//   auth: {
//       username: 'rori',
//       password: 'Ishaqsol1234!'
// }
  node: 'https://2177ea27fc8f46b3b1f0448d2f1279b0.eu-west-2.aws.cloud.es.io:9243',
  auth: {
  username: 'elastic',
  password: 'jGjdcjEeMa3ZcM2g6Nxf0jFR'
}
});
const User = require('./models/User');
const Post = require('./models/Post');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send("hello world")
});

app.get('/postCreater', (req, res) => {
  res.render('postCreater')
});

postController(app);
userController(app);

client.cluster.health({},function(err,resp,status) {  
  console.log("-- Client Health --",resp);
});



async function run () {
  // Let's start by indexing some data
  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
});

  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Daenerys Targaryen',
      quote: 'I am the blood of the dragon.'
    }
});

await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.'
    }
});

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
await client.indices.refresh({ index: 'game-of-thrones' })

  // Let's search!
  const { body } = await client.search({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query: {
        match: { quote: 'winter' }
      }
    }
  })

  console.log(body.hits.hits)
}

// run().catch(console.log)

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("were connected to DB")
});
mongoose.connect('mongodb+srv://Rori:Ishaqsol1234@cluster0-mawms.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
app.listen(3000, () => console.log("waiting on port 3000"));