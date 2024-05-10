const express = require('express'),
	router = express.Router(),
	memberController = require('../controllers/memberController');

router.get('/member/:name', memberController.showMember);
module.exports = router;
