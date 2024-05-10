const express = require('express'),
	router = express.Router(),
	homeController = require('../controllers/homeController');

router.get('/', (req, res) => {
	res.render('index');
});
module.exports = router;
