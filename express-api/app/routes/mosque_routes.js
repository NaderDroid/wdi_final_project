const express = require('express')
const passport = require('passport')
const Mosque = require('../models/mosque')
const User = require('../models/user')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

router.get('/test' , (req , res ) => {
    res.status(200).send('Welcome; Everything is working fine')
})

router.get('/mosques', (req, res, next) => {
  Mosque.find()
    .then(mosques => res.status(200).json({mosques: mosques}))
    .catch(next)
  // // Option 2 get user's mosques
  // // must import User model and User model must have virtual for mosques
  // User.findById(req.user.id)
    // .populate('mosques')
    // .then(user => res.status(200).json({ mosques: user.mosques }))
    // .catch(next)
})
router.get('/user_id/:id'  , (req , res , next) => {
        // const current = req.body.mosque
    Mosque.findById( req.params.id)
        .then(mosque => {
            //const ownerId = mosque.owner
            User.findById(mosque.owner)
                .then(user => res.json({user: user.email}))
        })
})
router.get('/by_user/:id' , requireToken , (req , res , next) => {
    User.findById(req.params.id)
        .then(user => Mosque.find({owner : user.id})
            .then(mosques => res.json({mosques : mosques})))

})

// SHOW
// GET /mosques/5a7db6c74d55bc51bdf39793
router.get('/mosques/:id', (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Mosque.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "mosque" JSON
    .then(mosque => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      res.status(200).json({ mosque: mosque.toObject() })
    })
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /mosques
router.post('/mosques/add', requireToken, (req, res, next) => {
  // set owner of new mosque to be current user
  req.body.mosque.owner = req.user.id

  Mosque.create(req.body.mosque)
    // respond to successful `create` with status 201 and JSON of new "mosque"
    .then(mosque => {
      res.status(201).json({ mosque: mosque.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /mosques/5a7db6c74d55bc51bdf39793
router.patch('/mosques/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.mosque.owner

  Mosque.findById(req.params.id)
    .then(handle404)
    .then(mosque => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, mosque)

      // pass the result of Mongoose's `.update` to the next `.then`
      return mosque.update(req.body.mosque)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.status(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /mosques/5a7db6c74d55bc51bdf39793
router.delete('/mosques/:id', requireToken, (req, res, next) => {
  Mosque.findById(req.params.id)
    .then(handle404)
    .then(mosque => {
      // throw an error if current user doesn't own `mosque`
      requireOwnership(req, mosque)
      // delete the mosque ONLY IF the above didn't throw
      mosque.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
