const db = require('../models/index'),
	flash = require('connect-flash'),
	passport = require('passport'),
	User = db.user,
	Fan = db.fan;

module.exports = {
	showSignin: (req, res) => {
		res.render('signin');
	},
	signin: async (req, res, next) => {
		try {
			console.log(req.body);
			console.log(req.query);
			try {
				let fan = await Fan.findOne({where: {email: req.body.email}});
				if (fan && fan.id === req.body.id) {
					res.locals.redirect = `/user/${fan.getDataValue('id')}`;
					res.locals.fan = fan;
					res.redirect(res.locals.redirect);
					next();
				}
			} catch (err) {
				res.locals.redirect = '/user/login';
				next();
			}
		} catch (err) {
			res.status(500).send({
				message: err.message 
			});
			console.log(err.message);
		}
	},
	authenticate: passport.authenticate('local',{
		failureRedirect: '/user/signin',
		failureFlash: 'failed to sign in',
		successRedirect: '/',
		successFlash: 'successed to sign in'
	}),

	showUserPage: (req, res) => {
		res.render('userPage', {userId: req.params.id});
	}
}
