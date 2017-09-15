require('../models/User')

module.exports = (app, passport) => {
  app.post('/api/signup', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        return next(err)
      }

      if (!user) {
        console.log(info)
        return next(Error.createExpressError(`Failed to create new user: ${info.message}`, 401))
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err)
        }

        return res.status(200).json({
          message: 'Signup successful',
          data: user
        })
      })
    })(req, res, next)
  })

  app.post('/api/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      if (err) {
        return next(err)
      }

      if (!user) {
        return next(Error.createExpressError(`Unknown authentication error: ${info.message}`, 401))
      }

      req.logIn(user, (err) => {
        console.log('session', req.session)
        console.log('user', req.user)
        if (err) {
          return next(err)
        }

        return res.status(200).json({
          message: 'Login successful',
          data: user
        })
      })
    })(req, res, next)
  })

  app.get('/api/get_user', (req, res) => {
    console.log('hitting get_user', req.headers)
    res.status(200).json({
      message: req.user ? 'User session exists' : 'User session does not exist',
      data: req.user
    })
  })

  app.get('/api/logout', (req, res) => {
    req.logout()
    return res.status(200).json({
      message: 'Logout successful'
    })
  })
}
