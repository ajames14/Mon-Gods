
const express = require('express')
const Spot = require('../models/Spot')

const getUsers = express()

function create(req, res) {

  
  req.body.user = req.currentUser
  Spot.create(req.body)
    .then(spot => res.status(201).json(spot))
    .catch(err => {
      res.status(422).json({ 
        spotName: 'Spot already exists',
        lat: 'Please provide latitude (e.g. -32.315573)',
        long: 'Please provide longitude (e.g. 18.335906)',
        country: 'Country Required',
        region: 'Region Required',
        image: 'Image Required',
        description: 'Please provide description',
        level: 'Please provide level',
        typeOfWave: 'Please give wave type'
      })
    }
    )
}

function index(req, res) {
  Spot
    .find()
    .populate('user')
    .then(spots => res.status(200).json(spots))
    .catch(err => console.log(err))
}

function show(req, res) {
  req.body.user = req.currentUser
  Spot
    .findById(req.params.id)
    .populate('comments.user')
    .then(spot => {
      // console.log('My spots is', spot)
      if (!spot) res.status(404).json({ message: '404 Not found' })
      else res.status(200).json(spot)
    })
    .catch(err => console.log(err))
}

function update(req, res) {
  Spot
    .findById(req.params.id)
    .then(spot => {
      if (!spot) return res.status(404).json({ message: '404 Not found' })
      if (!req.currentUser._id.equals(spot.user)) return res.status(401).json({ message: 'Unauthorized' })
      return spot.set(req.body)
    })
    .then(spot => spot.save())
    .then(spot => res.status(202).json(spot))
}

function remove(req, res) {
  Spot
    .findById(req.params.id)
    .then(spot => {
      if (!spot) return res.status(404).json({ message: 'Not Found' })
      return spot.remove()
    })
    .then(() => res.status(200).json({ message: 'Spot deleted' }))
    .catch(err => console.log(err))
}

function createComment(req, res) {
  req.body.user = req.currentUser
  Spot
    .findById(req.params.id)
    .populate('comments.user')
    .then(spot => {
      if (!spot) return res.status(200).json({ message: 'First error' })
      spot.comments.push(req.body)
      return spot.save()
    })
    .then(spot => res.status(201).json(spot))
    .catch(err => res.status(404).json({ message: 'Not Found' }))
}
function addRating(req, res) {
  req.body.user = req.currentUser
  Spot
    .findById(req.params.id)
    .populate('rating.user') //check
    .then(spot => {
      if (!spot) return res.status(404).json({ message: 'Not Found' })
      if (req.body.rate < 1 || req.body.rate > 5) return res.status(404).json({ message: 'Invalid rating' })
      spot.rating.forEach(e => {
        if (req.currentUser._id.toString() === e.user._id.toString()) {
          console.log('matched user')
          return res.status(401).json({ message: 'You have already rated this spot' })
        }
      })
      spot.rating.push(req.body)
      return spot.save()
    })
    .then(spot => res.status(201).json(spot))
    .catch(err => res.status(404).json({ message: 'Not Found' }))
}

function deleteComment(req, res) {
  req.body.user = req.currentUser
  Spot
    .findById(req.params.id)
    .populate('comments.user')
    .then(spot => {
      if (!spot) return res.status(404).json({ message: 'Not Found' })
      const comment = spot.comments.id(req.params.commentId)
      comment.remove()
      return spot.save()
    })
    .then(spot => res.status(200).json(spot))
    .catch(err => res.json(err))
}

// Export all our functions
module.exports = {
  create,
  index,
  show,
  update,
  remove,
  createComment,
  deleteComment,
  addRating
}