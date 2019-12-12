const User = require('../models/User')
const Spot = require('../models/Spot')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function register(req, res) {
  User
    .create(req.body)
    .then(() => res.status(200).json({ message: 'Thanks' }))
    .catch(err => {
      res.status(422).json({
        email: 'Email Required',
        username: 'Username Required',
        password: 'Password Required',
        passwordConfirmation: 'Password did not match'
      })
    })
}

function favourite(req, res) {
  console.log('body user', req.currentUser.favourites[1])
  req.body.user = req.currentUser
  User
    .findById(req.currentUser.id)
    .then((user) => {
      // console.log(user.favourites)
      if (user) {
        user.favourites.forEach((e) => {
          if (e === req.params.id) {
            console.log('matches')
            return res.status(405).json({ message: 'already made as favourite', spotId: req.params.id })
          }
        })
        user.favourites.push(`${req.params.id}`)
        user.save()
        return res.status(200).json({ message: 'favourited', spotId: req.params.id })
      }
    })
    .catch(err => res.status(404).json({ message: 'Not Found' }))
}

function deleteFavourite(req, res) {
  req.body.user = req.currentUser
  User
    .findById(req.currentUser.id)
    .then((user) => {
      if (!user) return res.status(404).json({ message: 'Not Found' })
      const favs = user.favourites
      // console.log(favs)
      favs.forEach((e, i) => {
        if (e === req.params.id) {
          console.log(e, i)
          favs.splice(i, 1)
          return
        } else {
          return
        }
      })
      return user.save()
    })
    .then((user) => res.status(200).json({ favouritesLength: user.favourites.length, favourites: user.favourites }))
    .catch(err => res.status.json(err))
}

function showOne(req, res) {
  req.body.user = req.currentUser
  User
    .findById(req.currentUser.id)
    .then((resp) => {
      console.log(req.body.user.id)
      console.log(resp._id)
      if (resp) {
        return res.status(200).json({ favourites: resp.favourites, username: resp.username, profilePicture: resp.profilePicture })
      } else return res.status(200).json({ message: 'NO' })
    })
    .catch(err => {
      res.status(200).json({
        message: 'no user'
      })
    })
}

function update(req, res) {
  req.body.user = req.currentUser
  User
    .findById(req.currentUser.id)
    .then((user) => {
      if (!user) return res.status(404).json({ message: 'Not Found' })
      return user.set(req.body)
    })
    .then(user => user.save())
    .then(user => res.status(202).json(user))
}


function login(req, res) {
  User
    .findOne({ email: req.body.email }) //find the user by that email
    .then(user => { //check to if we found a record and the password provided matches what is in the database
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' }) // send a response of unauthorized and end the process here
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' }) // if all good, create a JSON web token (jwt), baking in the user id, a secret to encode/decode and an expiry time for the token
      res.status(202).json({ message: `Welcome Back ${user.username}`, token })
    }) //finally send back a message with that created token
    .catch(() => res.status(401).json({ message: 'Unauthorized' }))
}



module.exports = {
  register,
  login,
  showOne,
  favourite,
  deleteFavourite,
  update
}
// exporting each 'route handling' function, taking advantage of es6 object short hand, same as saying { login: login }