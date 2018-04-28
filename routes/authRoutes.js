const passport = require('passport');
const authentication = require('../controllers/authentication');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  app.post(
    '/api/local',
    passport.authenticate('local', {
      session: false
    })
  );
  app.post(
    '/api/signUp',
    // passport.authenticate('local', {
    //   session: false
    // }),
    authentication.signup
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
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
