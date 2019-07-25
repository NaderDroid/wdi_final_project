const mongoose = require('mongoose')

const mosqueSchema = new mongoose.Schema({

  coords : {
    x : {
      type : Number,
      min : -180,
      max : 180
    },
    y : {
      type : Number,
      min : -90,
      max : 90
    }
  },
  name : {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  hasJum : {
    type : Boolean,
    default : false,
    required : false
  },
  city : {
    type : String,
    required : true
  },
  region : {
    type : String,
    required : true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Mosque', mosqueSchema)
