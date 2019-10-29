const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const session = require('express-session')

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static('public'));

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false, cookie: { maxAge: 60000 }}));

require('./routes')(app);

app.listen(process.env.PORT||3000, () => {
	console.log(`App is running on port ${process.env.PORT}`);
})