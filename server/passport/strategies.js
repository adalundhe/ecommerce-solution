const bcrypt = require('bcrypt-nodejs')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

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
    (user, done) => {
      console.log('in serializeUser', user)
      done(null, user._id)
    }
  )

  passport.deserializeUser(
    (id, done) => {
      console.log('in deserializeUser', id)
      User.findById(id, (err, user) => done(err, user))
    }
  )

  passport.use('local-signup', new LocalStrategy({
    ...localStrategyConfig,
    passReqToCallback: true
  }, (req, email, password, done) => {
    console.log('here!!!')
    User.findOne({'local.email': email}, (err, user) => {
      console.log('inside find one')
      if (err) {
        return done(err)
      }

      if (user) {
        console.log('duplicate user')
        return done(Error.createExpressError(`A user with that email already exists: ${email}`, 422))
      }

      console.log('did not find existing user')

      const {body} = req
      const newUser = new User({
        local: {
          email,
          password: generateHash(password),
          firstName: body.firstName,
          lastName: body.lastName,
          role: body.role,
          stripeId: generateHash(body.stripeId)
        }
      })

      newUser.save(
        (err) => err ? done(err) : done(null, newUser)
      )
    })
  }))

  passport.use('local-login', new LocalStrategy(localStrategyConfig, (email, password, done) => {
    User.findOne({'local.email': email}, (err, user) => {
      console.log('inside login user.findone')
      if (err) {
        return done(err)
      }

      if (!user) {
        return done(Error.createExpressError(`Unknown email: ${email}`, 401))
      }

      if (!isPasswordValid(password, user.local.password)) {
        return done(Error.createExpressError('Incorrect password', 401))
      }

      return done(null, user)
    })
  }))
}
