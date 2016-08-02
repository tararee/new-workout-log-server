var router = require('express').Router();
var sequelize = require('../db');
var Log = sequelize.import('../models/log');
var Feed = sequelize.import('../models/feed');

// create log
router.post('/', function(req, res) {
	var description = req.body.log.desc;
	var result = req.body.log.result;
	var owner = req.user.id;
	var definition = req.body.log.def;

	Log
		.create({
			description: description,
			result: result,
			owner: owner,
			def: definition 
		})
		.then(
			function createSuccess(log) {
				res.json(log);
				var feedItem = { 
					//message: ` just completed ${log.def} with a result of: ${log.result}`,
					message: ' just completed ' + log.def + ' with a result of: ' + log.result,
					username: req.user.username 
				};
				Feed.create(feedItem)
				.then(
					function success(data) {
						var io = req.app.get('socketio');
						io.emit("new log", feedItem);
					},
					function error(err) {
						res.send(500, err.message);
					});
			},
			function createError(err) {
				res.send(500, err.message);
			}
		);
});

router.get('/', function(req, res) {
	var owner = req.user.id;
	Log
	.findAll({
		where: { owner: owner }
	})
	.then(
		function findAllSuccess(data) {
			res.json(data);
		},
		function findAllError(err) {
			res.send(500, err.message);
		}
	);
});

module.exports = router;