var users = require('../controllers/users');
var polls = require('../controllers/polls');

module.exports = function ( app ) {

	// LOGIN REGISTRATION ROUTES
	
	app.post('/users/login', function ( req, res ) {
		users.login(req,res);
	});

	
	// POLL ROUTES
	
	app.post('/poll', function( req, res) {
		polls.create(req, res);
	});
	
	app.post('/polls/:id', function( req, res) {
		polls.vote(req, res);
	});

	app.get('/polls', function( req, res ) {
		polls.index(req, res);
	});

	app.get('/polls/:id', function( req, res ) {
		polls.getPoll(req, res);
	});
	
	app.delete('/polls/:id', function( req, res) {
		polls.delete(req, res);
	});
	


};
