
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const ratingSchema = new mongoose.Schema({
  rate: { type: Number, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

const spotSchema = new mongoose.Schema({
  spotName: { type: String, required: true, unique: true },
  lat: { type: String },
  long: { type: String },
  country: { type: String, required: true },
  region: { type: String },
  image: { type: String },
  description: { type: String },
  level: { type: String, required: true },
  typeOfWave: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema],
  rating: [ratingSchema]
}, {
  timestamps: true
})

spotSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Spot', spotSchema)
