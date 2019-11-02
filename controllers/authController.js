const bcrypt = require('bcrypt');
const db = require('../models/');

module.exports = {
  register: (req, res) => {
    bcrypt.genSalt()
      .then(salt => {
        bcrypt.hash(req.body.password, salt)
          .then(hash => {
            db.User
              .create({ username: req.body.username, hash })
              .then(newUser => {
                res.redirect('/login');
              })
              .catch(err => res.status(500).send(err.message));
          })
          .catch(err => res.status(500).send(err.message));
      })
      .catch(err => res.status(500).send(err.message));
  },
  logout: (req, res) => {
    req.logout();
    res.sendStatus(200);
  }
};
