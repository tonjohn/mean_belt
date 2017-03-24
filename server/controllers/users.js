var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
	index: function(req,res){
		User.find({}, function ( err, users ) {
			console.log("Users:", users);
			res.json(users);
		});
	},
	login: function(req,res){
		console.log("Received login request:", req.body);
		var AUTH = "login";
		User.findOne({name: req.body.name}, function ( err, data ) {
			if(err)
			{
				console.log('something went wrong');
				console.log(err.message);
				res.json(err);
			}
			else if( !data)
			{
				user = new User(req.body);
				user.save( function ( err, newUser ) {
					if( err )
					{
						console.log('something went wrong');
						console.log(err.message);
						res.json(err);
					}
					else
					{
						newUser.auth = AUTH;
						res.json(newUser);
					}
				});
			}
			else{
				// res.json({errors: {loginForm: { message: "user name and/or password is invalid"}}})
				data.auth = AUTH;
				res.json(data);
			}
		});
	},
};