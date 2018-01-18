var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var { mongoose } = require('./db/mongoose');
var { Chunk } = require('./models/chunk');

var app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('root');
});


// get
app.get('/chunks', (req, res) => {
  Chunk.find().then( (chunks) => {
    res.send(chunks);
  }).catch( (e) => {
    res.stats(400).send(e);
  });
});


// get one
app.get('/chunks/:id', (req, res) => {
  var pid = req.params.id;

  Chunk.find({ 'chunk_id': pid }).then( (chunk) => {
    res.send(chunk);
  }).catch( (e) => {
    res.stats(400).send(e);
  });
});


// add
app.post('/chunks', (req, res) => {
  var chunk = new Chunk({
    "chunk_id": req.body.chunk_id,
    "title": req.body.title,
    "description": req.body.description,
    "languages": req.body.languages,
    "keywords": req.body.keywords,
    "code": req.body.code
  });

  chunk.save().then( (doc) => {
    res.send(doc);
  }).catch( (e) => {
    res.status(400).send(e);
  });
});


// delete
app.delete('/chunks/:id', (req, res) => {
  var pid = req.params.id;

  Chunk.findOneAndRemove({ 'chunk_id': pid }).then( (chunk) => {
    res.send(chunk);
  }).catch( (e) => {
    res.stats(400).send(e);
  });
});


// listen
app.listen(port, () => { console.log('server running at port 3000') });
