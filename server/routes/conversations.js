const express = require('express');
const isAuth = require('../middlewares/isAuth');
const router = express.Router();
const conversationsController = require('../controllers/Conversations/conversation');

router.get('/conversations',isAuth ,conversationsController.getAllConversations);
router.get('/conversations/:conversationId',isAuth,conversationsController.getConversation);
router.get('/conversations/:conversationId/images', isAuth,conversationsController.getMessageImages);
router.post('/:conversationId/message',isAuth,conversationsController.postMessage);

module.exports = router;