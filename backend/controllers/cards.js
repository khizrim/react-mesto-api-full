const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (
        err.kind === 'ObjectId'
        || err.name === 'ValidationError'
        || err.name === 'CastError'
      ) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании карточки',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка c указанным ID не найдена');
    })
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        Card.deleteOne(card).then(() => res.send({ data: card }));
      } else {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
    })
    .catch((err) => {
      if (
        err.kind === 'ObjectId'
        || err.name === 'ValidationError'
        || err.name === 'CastError'
      ) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при удалении карточки',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка c указанным ID не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (
        err.kind === 'ObjectId'
        || err.name === 'ValidationError'
        || err.name === 'CastError'
      ) {
        next(
          new BadRequestError(
            'Переданы некорректные данные для постановки лайка',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка c указанным ID не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (
        err.kind === 'ObjectId'
        || err.name === 'ValidationError'
        || err.name === 'CastError'
      ) {
        next(
          new BadRequestError('Переданы некорректные данные для снятия лайка'),
        );
      } else {
        next(err);
      }
    });
};
