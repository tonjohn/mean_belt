app.controller('createController', ['$scope', '$location', 'pollsFactory', function ( $scope, $location, pollsFactory ) {
	
	var curUser = $scope.$parent.curUser;
	
	$scope.create = function (  ) {
		console.log( "$scope.poll", $scope.poll);
		$scope.poll._user = curUser._id;
		$scope.poll.name = curUser.name;
		pollsFactory.create( $scope.poll, function ( data ) {
			console.log("Create Poll reponse:", data);
			if( data.errors )
			{
				$scope.errors = data.errors;
			}
			else
			{
				$location.path("/dashboard");
			}
			
		});
	};
	
}]);