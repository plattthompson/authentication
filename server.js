const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const routes = require('./routes/');

const app = express();

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/authenticate', { useUnifiedTopology: true, useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));

const sessConfig = {
  secret: 'keyboard cat', resave: false, saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { path: '/', httpOnly: true, maxAge: 5 * 60 * 1000 }
}

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  sessConfig.cookie.secure = true;
}

app.use(session(sessConfig));
app.use(routes);

app.listen(process.env.PORT || 3000, () => {
	console.log('App is running');
})