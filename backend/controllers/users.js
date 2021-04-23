const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUsersById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь c указанным ID не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (
        err.kind === 'ObjectId'
        || err.name === 'ValidationError'
        || err.name === 'CastError'
      ) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при поиске пользователя',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c указанным ID не найден');
      }

      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.send({ data: user.toJSON() }))
      .catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          next(
            new ConflictError(
              'Пользователь с таким почтовым адресом уже существует',
            ),
          );
        }
        if (
          err.kind === 'ObjectId'
          || err.name === 'ValidationError'
          || err.name === 'CastError'
        ) {
          next(
            new BadRequestError(
              'Переданы некорректные данные при создании пользователя',
            ),
          );
        } else {
          next(err);
        }
      });
  });
};

module.exports.editUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь c указанным ID не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (
        err.kind === 'ObjectId'
        || err.name === 'ValidationError'
        || err.name === 'CastError'
      ) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении профиля',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports.editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь c указанным ID не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (
        err.kind === 'ObjectId'
        || err.name === 'ValidationError'
        || err.name === 'CastError'
      ) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении аватара',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }),
      });
    })
    .catch(next);
};
