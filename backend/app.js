require('dotenv').config();

const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const { errors } = require('celebrate');
const { errorHandler } = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { auth } = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { validateAuth, validateSignInBody, validateSignUpBody } = require('./middlewares/validators');

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateSignInBody, login);
app.post('/signup', validateSignUpBody, createUser);

app.use('/users', validateAuth, auth, require('./routes/users'));
app.use('/cards', validateAuth, auth, require('./routes/cards'));

app.use(require('./routes/404'));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
