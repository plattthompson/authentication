const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static("public"));


app.post('/register', (req, res) => {
	console.info(req.body);
	res.json(req.body);
});
app.get('/register', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/register.html'));
});

app.post('/login', (req, res) => {
	console.info(req.body);
	res.json(req.body);
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

app.post('/', (req, res) => {
	res.json('Got your request!');
});
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(process.env.PORT||3000, () => {
	console.log(`App is running on port ${process.env.PORT}`);
})