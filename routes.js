const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

module.exports = app => {
  mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/authenticate', { useUnifiedTopology: true, useNewUrlParser: true });
  app.use(session({
    secret: 'keyboard cat', resave: false, saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }));
  
  const db = require('./models/');

  app.post('/register', (req, res) => {
    console.info(req.body);

    bcrypt.genSalt(10)
      .then(salt => {
        bcrypt.hash(req.body.password, salt)
          .then(hash => {
            db.User.create({ username: req.body.username, hash })
              .then(result => {
                console.info(result);
                req.session.user = result;
                res.redirect('/secure');
              })
              .catch(err => console.error(err));
          });
      });
  });
  app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/register.html'));
  });

  app.post('/login', (req, res) => {
    console.info(req.body);

    db.User.findOne({ username: req.body.username })
      .then(result => {
        console.info(result);

        if (result === null) {
          res.sendStatus(401);
        }

        bcrypt.compare(req.body.password, result.hash)
          .then(match => {
            console.info(match);

            if (match) {
              req.session.user = result;
            }

            res.redirect('/secure');
          })
          .catch(err => {
            console.error(err);
            res.sendStatus(401);
          });
      })
      .catch(err => console.error(err));
  });
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
  });

  app.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error(err);
      }

      res.sendStatus(200);
    });
  });

  app.get('/secure', (req, res) => {
    console.info(req.session);
    if (!req.session.user) {
      res.redirect('/login')
    }
    res.sendFile(path.join(__dirname, '/public/secure.html'));
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });
};
