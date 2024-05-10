const express = require('express'),
	router = express.Router(),
	userController = require('../controllers/userController');
router.get('/mypage', (req, res) => {
	req.flash('success');
	res.render('mypage', { message: req.flash() });
});
router.post('/mypage/update/email', userController.updateEmail);
router.post('/mypage/update/birthdate', userController.updateBirthdate);
module.exports = router;
