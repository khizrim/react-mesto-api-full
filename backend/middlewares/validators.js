const { celebrate, Joi } = require('celebrate');
const { isEmail, isURL } = require('validator');
const { ObjectId } = require('mongoose').Types;

module.exports.validateAuth = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().min(2).max(200).required(),
    })
    .unknown(true),
});

module.exports.validateSignInBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (isEmail(value)) {
          return value;
        }
        return helpers.message('Введите адрес электронной почты');
      }),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validateSignUpBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message('Введите ссылку');
    }),
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (isEmail(value)) {
          return value;
        }
        return helpers.message('Введите адрес электронной почты');
      }),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (isURL(value)) {
          return value;
        }
        return helpers.message('Введите ссылку');
      }),
  }),
});

module.exports.validateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateUserAvatarBody = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (isURL(value)) {
          return value;
        }
        return helpers.message('Введите ссылку');
      }),
  }),
});

module.exports.validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный ID карточки');
      }),
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный ID пользователя');
      }),
  }),
});
