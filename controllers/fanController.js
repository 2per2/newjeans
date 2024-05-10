const db = require('../models/index'),
	Fan = db.fan,
	User = db.User,
	Op = db.Sequelize.Op;

exports.getAllFans = async (req, res) => {
	try {
		data = await User.findAll();
		console.log(data);
		res.render('fan', { user: data, message: req.flash() });
	} catch (err) {
		res.status(500).send({
			message: err.message
		});
	}
};

exports.deleteFan = async (req, res) => {
	try {
                data = await Fan.findAll();
                console.log(data);
                res.render('fan', {fan: data});
        } catch (err) {
                res.status(500).send({
                        message: err.message
                });
        }
};
