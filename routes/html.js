const path = require('path');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../utils/auth');

router.route('/register')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
  })

router.route('/login')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
  })

router.route('/secure')
  .get(auth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/secure.html'));
  });

router.route('/')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

module.exports = router;
