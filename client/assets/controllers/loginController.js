app.controller('loginController', ['$scope', '$location','$cookies', 'usersFactory', function ( $scope, $location, $cookies, usersFactory ) {
	
	var index = function (  ) {
		
		$scope.curUser = usersFactory.getCurUser();
		// check if the user is already logged in and redirect
		console.log("loginController index");
		console.log($scope.curUser);
		
		// if( $scope.curUser._id )
		// {
		// 	$location.path("/dashboard")
		// }
	};
	index();
	
	$scope.login = function (  ) {
		
		usersFactory.login($scope.user, function ( data ) {
			
			if( !data.errors )
			{
				$scope.user = {};
				$scope.errors = {};
				$scope.loginForm.$setPristine(true);
				$scope.curUser = data;
				
				$cookies.putObject('curUser', data);
				
				$location.path('/dashboard');
			}
			else
			{
				$scope.errors = data.errors;
			}
			
		});
	};
	
	
	$scope.logout = function (  ) {
		
		$scope.curUser = {};
		usersFactory.logout();
		$location.path('/');
		
	}
	
}]);