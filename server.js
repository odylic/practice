const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

// mongoose DB url
// const CONNECTION_URL = '';
const mongoURI =
  process.env.NODE_ENV === 'test'
    ? 'mongodb://localhost/unit11test'
    : 'mongodb://localhost/unit11dev';
// mongoose.connect(mongoURI);

const PORT = process.env.PORT || 4000;
const app = express();
// Bodyparser
app.use(express.json());

app.use(cookieParser());

// const mainRouter = require('./routes/mainRouter.js');

// mongoose
//   .connect(CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => app.listen(PORT, () => console.log('Connected to Database')))
//   .catch((err) => console.log(err.message));

// mongoose.set('useFindAndModify', false);

app.get('/', cookieController.setCookie, (req, res) => {
  console.log('/ is fired');
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/signup', cookieController.setCookie, (req, res) => {
  console.log('/signup is fired');
  res.sendFile(__dirname + '/public/signup.html');
});

app.post(
  '/signup',
  userController.createUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    console.log('SIGNUP POST FIRED');
  }
);

app.post(
  '/login',
  userController.verifyUser,
  sessionController.isLoggedIn,
  cookieController.setSSIDCookie,
  (req, res) => {
    console.log('LOGIN FIRED');
  }
);

// app.use('*', (req, res) => {
//   res.status(400).send('You done fucked up');
// });

app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/index.html'));
});

// app.use('/api', mainRouter);
