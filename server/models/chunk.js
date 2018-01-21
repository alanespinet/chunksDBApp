var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chunkSchema = new Schema({
  chunk_id: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  languages: {
    type: [String],
    default: undefined
  },
  keywords: {
    type: [String],
    default: undefined
  },
  code: {
    type: String,
    required: true
  }
});


var userSchema = new Schema({
  user_id: {
    type: 'String',
    required: true,
    unique: true
  },
  chunks: [chunkSchema]
});


var User = mongoose.model('User', userSchema);

module.exports = { User };
