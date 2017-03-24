console.log( 'Polls Factory' );

app.factory('pollsFactory', ['$http', function ( $http ) {
	var factory = {};
	
	factory.index = function ( callback ) {
		$http.get('/polls').then(function ( res ) {
			console.log("Get Polls:", res);
			callback(res.data);
		});
	};
	
	factory.getPoll = function ( id, callback ) {
		$http.get('/polls/' + id).then(function ( res ) {
			console.log("Get Polls:", res);
			callback(res.data);
		});
	};
	
	factory.vote = function ( id, data, callback ) {
		$http.post('/polls/' + id, {data}).then(function ( res ) {
			console.log("Vote:", res);
			callback(res.data);
		});
	};
	
	factory.create = function ( poll, callback ) {
		$http.post('/poll', poll).then( function ( res ) {
			console.log('Poll Creation Response:', res );
			if( typeof(callback) == 'function')
			{
				callback(res.data);
			}
		});
	};
	
	factory.delete = function ( id, callback ) {
		
		$http.delete('/poll/' + id).then( function ( res ) {
			console.log('Delete Response:', res);
			if( typeof(callback) == 'function')
			{
				callback(res.data);
			}
		})
	};
	
	return factory;
	
}]);
