const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

router.get('*', (req, res, next) => {
  const notFound = new NotFoundError('Ресурс по указанному маршруту не найден');
  next(notFound);
});

module.exports = router;
