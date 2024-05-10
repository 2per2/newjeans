const express = require('express'),
	router = express.Router(),
	commentController = require('../controllers/commentController');

router.get('/comment', commentController.showCommentPage);
router.post('/comment', commentController.getBoardName, commentController.postComment);
router.delete('/comment/delete/:commentId', commentController.deleteComment);
module.exports = router;
