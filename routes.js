module.exports = app => {
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
};
