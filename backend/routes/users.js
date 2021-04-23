const router = require('express').Router();
const { validateUserId, validateUserInfoBody, validateUserAvatarBody } = require('../middlewares/validators');

const {
  getUsers,
  getUsersById,
  editUser,
  editUserAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo);
router.get('/', getUsers);
router.get('/:userId', validateUserId, getUsersById);
router.patch('/me', validateUserInfoBody, editUser);
router.patch('/me/avatar', validateUserAvatarBody, editUserAvatar);

module.exports = router;
