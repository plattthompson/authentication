const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {

});

app.post('/register', (req, res) => {

});

app.post('/login', (req, res) => {

});

app.post('/logout', (req, res) => {

});

app.post('/secure', (req, res) => {

});