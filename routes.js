const path = require('path');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/authenticate', { useUnifiedTopology: true, useNewUrlParser: true });

const db = require('./models/');

module.exports = app => {
  app.post('/register', (req, res) => {
    console.info(req.body);
    db.User.create({ username: req.body.username, password: req.body.password })
      .then(result => {
        console.info(result);
        res.redirect('/secure');
      })
      .catch(err => console.error(err));
  });
  app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/register.html'));
  });

  app.post('/login', (req, res) => {
    console.info(req.body);
    db.User.findOne({ username: req.body.username, password: req.body.password })
      .then(result => {
        console.info(result);
        if (result !== null) {
          res.redirect('/secure');
        } else {
          res.send(401);
        }
      })
      .catch(err => console.error(err));
  });
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
  });

  app.post('/logout', (req, res) => {
    res.send(200);
  });

  app.get('/secure', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/secure.html'));
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });
};
