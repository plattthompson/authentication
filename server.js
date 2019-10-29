const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const db = require('./models/');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/authenticate', { useUnifiedTopology: true, useNewUrlParser: true });

require('./routes')(app);

app.listen(process.env.PORT||3000, () => {
	console.log(`App is running on port ${process.env.PORT}`);
})