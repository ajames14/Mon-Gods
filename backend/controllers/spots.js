// Controllers contain all our 'handler logic' for our routes. So their
// job is essentially to use our models to perform CRUD operations
// (create, read, update, delete), and then send an appropriate response
// back to the client

const Spot = require('../models/Spot')

function create(req, res) {
  req.body.user = req.currentUser
  Spot.create(req.body)
    .then(spot => res.status(201).json(spot))
    .catch(err => console.log(err))
}

function index(req, res) {
  Spot
    .find()
    .populate('user')
    .then(spots => res.status(200).json(spots))
    .catch(err => console.log(err))
}

function show(req, res) {
  Spot
    .findById(req.params.id)
    .then(spot => {
      console.log('My spots is', spot)
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
      if (!spot) return res.status(404).json({ message: 'Not Found' })
      spot.comments.push(req.body)
      return spot.save()
    })
    .then(spot => res.status(201).json(spot))
    .catch(err => res.status(404).json({ message: 'Not Found' }))
}

function deleteComment(req, res) {
  Spot
    .findById(req.params.id)
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
  deleteComment
}