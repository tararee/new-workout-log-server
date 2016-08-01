var Sequelize = require('sequelize');
//postgres://postgres:password@localhost:5432/workoutlog
// postgres://postgres:password@localhost:5432/workoutlog
// var sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/workoutlog', {
//	dialect: 'postgres'	
// });
// postgres://postgres:password@localhost:5432/workoutlog
var sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/workoutlog', {
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function() {
		console.log('connected to workoutlog postgres db');
	},
	function(err) {
		console.log(err);
	}
);

var User = sequelize.import('./models/user');

module.exports = sequelize;