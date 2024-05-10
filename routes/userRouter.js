const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	userController = require('../controllers/userController');
router.get('/signup', userController.showSignup);
router.post('/signup', userController.signUp);
router.get('/signin', userController.showSignin);
router.post('/signin', userController.signIn);
router.get('/password_reset', (req, res) => {
	res.render('password_reset', { message: req.flash() });
});
router.post('/password_reset', async (req, res, next) => { 
	const userEmail = req.body.email; // body에서 추출한 이메일
	console.log(userEmail);
	const user = await userController.getUserByEmail(userEmail);
	if (user === 'user not found') {
		res.send('enter other email');
	}
	console.log(user);
	res.cookie('email', req.body.email, {});
	res.redirect('/password_setting');
	next();
});
router.get('/password_setting', (req, res, next) => {
	const userEmail = req.cookies.email;
	res.render('password_setting', { email: userEmail });
});
router.post('/password_setting', async (req, res, next) => {
	const newPassword = req.body.password;
	const userId = req.cookies.email;
	console.log(newPassword);
	const updatedUser = await userController.updatePassword(userId, newPassword);
	if (!updatedUser) {
		res.send('Oops!');
	} else {
		res.redirect('/signin');
	}
});
router.get('/signout', userController.signOut);
router.delete('/user/delete/:id', userController.deleteUser);
module.exports = router;
