const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

const localStrategyConfig = {
  usernameField: 'email',
  passwordField: 'password',
  failureFlash: true
}

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
        const err = Error('A user with that email already exists')

        return done(null, false, {
          message: `A user with that email already exists: ${email}`
        })
      }

      console.log('did not find existing user')

      const {body} = req
      const newUser = new User({
        local: {
          email,
          password: User.generateHash(password),
          firstName: body.firstName,
          lastName: body.lastName,
          role: body.role,
          stripeId: User.generateHash(body.stripeId)
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
        return done(null, false, {
          message: `Unknown email: ${email}`
        })
      }

      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password'
        })
      }

      return done(null, user)
    })
  }))
}
