var app = angular.module("app",['toaster']);
app.controller('UserController', ['$scope', '$window', 'toaster', function ($scope, $window, toaster) {
	$scope.usuario; 
	$scope.isAdmin = false;	

	$scope.createUser = function(userEmail, userPassword){
		
		var ref = new Firebase("https://shining-heat-6825.firebaseio.com/");
		ref.createUser({
			email    : userEmail,
			password : userPassword
		}, function(error, userData) {
			if (error) {
				console.log("Error creating user:", error);
			} else {
				console.log("Successfully created user account with uid:", userData.uid);
				alert(userEmail + ' cadastrado com sucesso!');
			}
		});

	}

	$scope.login = function(userEmail, userPassword){

		var ref = new Firebase("https://shining-heat-6825.firebaseio.com/");
		ref.authWithPassword({
			email    : userEmail,
			password : userPassword
		}, function(error, authData) {
			if (error) {
				toaster.pop('error', "Falha", "Email ou senha falhou!");
				console.log("Login Failed!", error);

			} else {				
				
				$scope.$apply(function() {
   					$scope.usuario = {'name':userEmail};		
				});				
				console.log("Authenticated successfully with payload:", authData);
				toaster.pop('success', "Sucesso", "Bem vindo ao chat!");
			}
		});

	}


	$scope.logout = function(){
		var ref = new Firebase("https://shining-heat-6825.firebaseio.com/");
		ref.onAuth(function(authData){
			$scope.usuario;
			$window.location.reload();
		});	
	}



}]);