require('../../models/User')

module.exports = (app, passport) => {
  app.post('/api/signup', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        return next(err)
      }

      if (!user) {
        console.log(info)
        return res.status(422).json({
          message: info.message
        })
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
        return res.status(401).json({
          message: info.message
        })
      }

      req.logIn(user, (err) => {
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

  app.get('/api/get_user', (req, res) =>
    res.status(200).json({
      message: req.user ? 'User session exists' : 'User session does not exist',
      data: req.user
    })
  )

  app.get('/api/logout', (req, res) => {
    req.logout()
    return res.status(200).json({
      message: 'Logout successful'
    })
  })
}
