var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/chunk');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('root');
});


// get user and all its chunks. The response of the find method returns an
// array of one element (if user is found) or empty array (if user is not found)
app.get('/users/:uid', (req, res) => {
  var uid = req.params.uid;

  User.find({ 'user_id': uid }).then( (users) => {
    res.send(users);
  }).catch( (e) => {
    res.stats(400).send(e);
  });
});


// add
// app.post('/chunks', (req, res) => {
//
//   console.log(req.body);
//
//   var chunk = new Chunk({
//     "chunk_id": req.body.chunk_id,
//     "title": req.body.title,
//     "description": req.body.description,
//     "languages": req.body.languages,
//     "keywords": req.body.keywords,
//     "code": req.body.code
//   });
//
//   chunk.save().then( (doc) => {
//     res.send(doc);
//   }).catch( (e) => {
//     res.status(400).send(e);
//   });
// });


// add a new user with no chunks to the database
app.post('/users', (req, res) => {
  var user = new User({
    "user_id": req.body.user_id,
    "chunks": []
  });

  user.save().then( (doc) => {
    res.send(doc);
  }).catch( (e) => {
    res.status(400).send(e);
  });
});


// add a new chunk to an existing user
app.post('/users/:uid/chunk', (req, res) => {
  var chunk = req.body.chunk;
  var uid = req.params.uid;

  User.find({ 'user_id': uid }).then( (users) => {
    var user = users.data[0];
    res.send(user);
  }).catch( (e) => {
    res.stats(400).send(e);
  });
});

// listen
app.listen(port, () => { console.log('server running at port 3000') });
