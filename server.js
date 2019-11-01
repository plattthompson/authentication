const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const routes = require('./routes/');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/authenticate', { useUnifiedTopology: true, useNewUrlParser: true });

const sessConfig = {
  secret: 'keyboard cat', resave: false, saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { path: '/', httpOnly: false, maxAge: 5 * 60 * 1000 }
}

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  sessConfig.cookie.secure = true;
}

app.use(session(sessConfig));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Add routes, both API and view
app.use(routes)

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/authenticate', { useUnifiedTopology: true, useNewUrlParser: true })

app.listen(process.env.PORT || 3001, () => {
	console.log('App is running');
})
