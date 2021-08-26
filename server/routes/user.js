const express = require('express');
const isAuth = require('../middlewares/isAuth');
const router = express.Router();
const userController = require('../controllers/Users/user');

router.put('/edit-profile',isAuth,userController.editProfile);
router.put('/edit-avatar',isAuth,userController.editAvatar);
router.post('/add-contact',isAuth,userController.addContact);
router.get('/contacts',isAuth,userController.getContacts);
router.get('/profile',isAuth,userController.getProfile);
module.exports = router;