const bcrypt = require('bcrypt-nodejs')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const Errors = require('./errors')

const localStrategyConfig = {
  usernameField: 'email',
  passwordField: 'password',
  failureFlash: true
}

const isPasswordValid = (clearPassword, hashedPassword) =>
  bcrypt.compareSync(clearPassword, hashedPassword)

const generateHash = (clearPassword) =>
  bcrypt.hashSync(clearPassword, bcrypt.genSaltSync(8), null)

module.exports = (passport) => {
  passport.serializeUser(
    (user, done) => done(null, user._id)
  )

  passport.deserializeUser(User.findById.bind(User))

  passport.use('local-signup', new LocalStrategy({
    ...localStrategyConfig,
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({'local.email': email}, (err, user) => {
      if (err) {
        return done(err)
      }

      if (user) {
        return done(Errors.duplicateEmail({email}))
      }

      const {body} = req
      const newUser = new User({
        local: {
          email,
          password: generateHash(password),
          firstName: body.firstName,
          lastName: body.lastName,
          role: body.role
        }
      })

      newUser.save(
        (err) => err ? done(err) : done(null, newUser)
      )
    })
  }))

  passport.use('local-login', new LocalStrategy(localStrategyConfig, (email, password, done) => {
    User.findOne({'local.email': email}, (err, user) => {
      if (err) {
        return done(err)
      }

      if (!user) {
        return done(Errors.unknownEmail({email}))
      }

      if (!isPasswordValid(password, user.local.password)) {
        return done(Errors.incorrectPassword())
      }

      return done(null, user)
    })
  }))
}
