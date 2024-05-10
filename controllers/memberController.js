exports.showMember = (req, res) => {
	let paramsName = req.params.name;
	res.render('member', {name: paramsName});
}
