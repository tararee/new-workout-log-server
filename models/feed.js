module.exports = (sequelize, DataTypes) => {
	// User model created using sequelize
	return sequelize.define('feed', {
		username: DataTypes.STRING,
		message: DataTypes.STRING
	});	

};
