// The router is going to handle all our routing logic, and provide a nice way of adding
// our secure route middleware to routes where you need to be logged in.
const router = require('express').Router()
const spots = require('./controllers/spots')
const users = require('./controllers/users')

// const address = require('./controllers/latlong')
const latlong = require('./controllers/latlong')

// Secure route is our custom middleware
const secureRoute = require('./lib/secureRoute')

router.route('/address')
  .post(latlong.address)

router.route('/spots')
  .get(spots.index)
  .post(secureRoute, spots.create)

router.route('/spots/:id')
  .get(spots.show)
  .put(secureRoute, spots.update)
  .delete(secureRoute, spots.remove)


router.route('/spots/:id/rate')
  .post(secureRoute, spots.addRating)

router.route('/spots/:id/favourite')
  .post(secureRoute, users.favourite)
  .delete(secureRoute, users.deleteFavourite)

router.route('/profile')
  .get(secureRoute, users.showOne)
  .put(secureRoute, users.update)

router.route('/spots/:id/comments')
  .post(secureRoute, spots.createComment)

router.route('/spots/:id/comments/:commentId')
  .delete(secureRoute, spots.deleteComment)

router.route('/register')
  .post(users.register)
  

  //CHANGEEEEED
// router.route('/lat')
//   .post(address.latlong)

router.route('/login')
  .post(users.login)

module.exports = router


