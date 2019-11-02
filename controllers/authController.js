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
                req.session.user = { id: newUser._id, username: newUser.username };
                res.redirect('/secure');
              })
              .catch(err => res.status(500).send(err.message));
          })
          .catch(err => res.status(500).send(err.message));
      })
      .catch(err => res.status(500).send(err.message));
  },
  login: (req, res) => {
    db.User
      .findOne({ username: req.body.username })
      .then(user => {
        if (!user) {
          res.status(401).send("username or password incorrect");
        }

        bcrypt.compare(req.body.password, user.hash)
          .then(match => {
            if (match) {
              req.session.user = { id: user._id, username: user.username };
              res.redirect('/secure');
            }
            res.status(401).send("username or password incorrect");
          })
          .catch(err => res.status(500).send(err.message))
      })
      .catch(err => res.status(500).send(err.message));
  },
  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        res.status(500).send(err.message);
      }
      res.sendStatus(200);
    });
  }
};
