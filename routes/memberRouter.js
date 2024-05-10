const express = require('express'),
	router = express.Router(),
	memberController = require('../controllers/memberController'),
	commentController = require('../controllers/commentController');

//router.get('/member/:name', memberController.showMember);
router.get('/member/:name', commentController.showMemberPage);
router.post('/member/:name', commentController.getBoardName, commentController.postComment);
module.exports = router;
