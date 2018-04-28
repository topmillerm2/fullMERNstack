const passport = require('passport');
const authentication = require('../controllers/authentication');
require('../services/passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  app.post(
    '/api/login',
    passport.authenticate('local', {
      // successRedirect: '/api/login',
      session: false
    }),
    authentication.login
  );
  app.post('/api/signUp', authentication.signup);

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );
  app.get(
    '/api/login',
    // passport.authenticate('local'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
