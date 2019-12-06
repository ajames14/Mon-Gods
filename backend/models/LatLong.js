const mongoose = require('mongoose')

const latLongSchema = new mongoose.Schema({
  lat: { type: String, required: true },
  lon: { type: String, required: true }
})

spotSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Spot', spotSchema)
// module.exports = mongoose.model('Animal', animalSchema)  // OLD
