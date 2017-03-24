console.log( 'Users Factory' );

app.factory('usersFactory', ['$http', '$cookies', function ( $http, $cookies ) {
	var factory = {};
	var ANON_USER = {_id: 0, name: "Anonymous", auth: "anon"}
	var curUser = ANON_USER;
	
	factory.index = function ( callback ) {
		
		$http.get('/users').then(function ( returned_data ) {
			console.log(returned_data);
			callback(returned_data.data);
		});
	};
	
	factory.getCurUser = function (  ) {
		console.log("curUser:", curUser);
		
		if( !curUser._id )
		{
			var user = $cookies.getObject('curUser');
			console.log("Cookie:", user);
			if( user )
			{
				curUser = user;
				curUser.auth = "cookie";
			}
		}
		
		return curUser;
	};
	
	factory.logout = function (  ) {
		$cookies.remove('curUser');
		curUser = ANON_USER;
		
	};
	
	factory.login = function ( user, callback ) {
	
			$http.post('/users/login', user).then( function ( res ) {
				console.log('Login Response:', res );
				if( res.data._id ){
					curUser = res.data;
				}
				
				if( typeof(callback) == 'function')
				{
					callback(res.data);
				}
			});
	};
	
	return factory;
	
}]);