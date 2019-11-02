const path = require('path');
const router = require('express').Router();

router.route('/register')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
  })

router.route('/login')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
  })

router.route('/secure')
  .get((req, res) => {
    if (!req.session.user) {
      res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, '../public/secure.html'));
  });

router.route('/')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

module.exports = router;
