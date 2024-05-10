const express = require('express'),
	router = express.Router(),
	commentController = require('../controllers/commentController');

router.get('/comment', commentController.getAllComments, (req, res) => {
	res.render('comment', { message: req.flash(), comments: req.comments });
});
router.post('/comment', commentController.getBoardName, commentController.postComment);
router.delete('/comment/delete/:commentId', commentController.deleteComment);
module.exports = router;
