const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

// Auth skeleton:
// - Express app
// - Routes: /, /register, /login, /logout, /secure
// - MySQL w/ Sequelize
// - Model User w/ username, hash, salt

// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname+'/public/index.html'));
// });

app.post('/', (req, res) => {
	res.json('Got your request!');
});

app.post('/register', (req, res) => {
	
});

app.post('/login', (req, res) => {
	
});

app.post('/logout', (req, res) => {

});

app.post('/secure', (req, res) => {

});

app.listen(process.env.PORT||3000, () => {
	console.log(`App is running on port ${process.env.PORT}`);
})