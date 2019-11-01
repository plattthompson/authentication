const bcrypt = require('bcrypt');
const db = require('../models/');

// Defining methods for the authController
module.exports = {
  register: (req, res) => {
    bcrypt.genSalt()
      .then(salt => {
        bcrypt.hash(req.body.password, salt)
          .then(hash => {
            db.User
              .create({ username: req.body.username, hash })
              .then(newUser => {
                req.session.user = newUser;
                res.send(200);
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
              req.session.user = user;
              res.send(200);
            }
            res.status(401).send("username or password incorrect");
          })
          .catch(err => res.status(500).send(err.message))
      })
      .catch(err => res.status(500).send(err.message));
  },
  validateSession: (req, res) => {
    console.info('sid:', req.session._id);
    if (req.params.sid === req.session._id) {
      res.send(200);
    }
    res.send(403);
  },
  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        res.status(500).send(err.message);
      }
      res.send(200);
    });
  }
};
