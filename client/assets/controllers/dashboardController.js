app.controller('dashboardController', ['$scope', '$routeParams', 'pollsFactory', 'usersFactory', function ( $scope, $routeParams, pollsFactory, usersFactory ) {
	console.log("Dashboard Controller");
	$scope.polls = [];
	
	$scope.curUser = usersFactory.getCurUser();
	
	$scope.sortType     = 'createdAt'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchPoll   = '';     // set the default search/filter term
	
	var index = function (  ) {
		pollsFactory.index( function ( data ) {
			
			if( data.errors )
			{
				$scope.errors = data.errors;
			}
			else
			{
				// console.log("INDEX:", data)
				$scope.polls = data;
				console.log($scope.polls);
			}
		});
	};
	index();
	
	$scope.delete = function ( id ) {
		
		pollsFactory.delete( id, function ( data ) {
			console.log("Delete reponse:", data);
			index();
			
		});
	};
	
}]);