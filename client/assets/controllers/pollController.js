app.controller('pollController', ['$scope', '$routeParams', 'pollsFactory', 'usersFactory', function ( $scope, $routeParams, pollsFactory, usersFactory ) {
	
	$scope.poll = {};
	
	$scope.curVote = 0;
	
	$scope.curUser = usersFactory.getCurUser();
	
	var index = function (  ) {
		pollsFactory.getPoll( $routeParams.id,  function ( data ) {
			
			if( data.errors )
			{
				$scope.errors = data.errors;
			}
			else
			{
				// console.log("INDEX:", data)
				$scope.poll = data;
				console.log($scope.poll);
			}
		});
	};
	index();
	
	$scope.vote = function ( option ) {
		
		var data = {
			option: option,
			_user: $scope.curUser._id,
			_poll: $scope.poll._id,
		};
		pollsFactory.vote( $scope.poll._id, data, function ( data ) {
			console.log("Vote reponse:", data);
			$scope.poll = data;
			
		});
		$scope.curVote = option;
	};
	
}]);