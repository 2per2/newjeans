const express = require('express'),
	router = express.Router(),
	memberController = require('../controllers/memberController'),
	commentController = require('../controllers/commentController');

router.get('/member/:name', commentController.getAllComments, (req, res) => {
	res.render(`members/${req.params.name}`, { message: req.flash(), comments: req.comments, name: req.params.name });
});
router.post('/member/:name', commentController.getBoardName, commentController.postComment);
module.exports = router;
