module.exports = (sequelize, Sequelize) => {
	const Fan = sequelize.define('fan', {
		id: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false,
			unique: true
		}
	},
	{
		timestamps: false,
		freezeTableName: true
	});
	return Fan;
}
