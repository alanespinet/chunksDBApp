var mongoose = require('mongoose');

var Chunk = mongoose.model('Chunk', {
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

module.exports = { Chunk };
