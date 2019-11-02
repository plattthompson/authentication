const passport = require('passport');
const router = require('express').Router();
const authController = require('../controllers/authController');

router.route('/register')
  .post(authController.register);

router.route('/login')
  .post(passport.authenticate('local', { successRedirect: '/secure', failureRedirect: '/login' }));

router.route('/logout')
  .delete(authController.logout);

router.route('/auth/github')
  .get(passport.authenticate('github'));

router.route('/auth/github/callback')
  .get(passport.authenticate('github', { successRedirect: '/secure', failureRedirect: '/login' }));

module.exports = router;
