var GOOGLE_CLIENT_ID = '465918363.apps.googleusercontent.com';
hello.init({ 
	facebook : '1422397417974016',
	google   : GOOGLE_CLIENT_ID
},{redirect_uri:''});

var app = angular.module("myapp", ["firebase"]);
function MyController($scope, angularFire) {
  var ref = new Firebase("https://8enmann.firebaseio.com/");
  $scope.messages = [];
  angularFire(ref, $scope, "messages");
  
	hello.subscribe('auth.login', function(auth){
		// call user information, for the given network
		hello.api(auth.network + '/me', function(r){
			if(!r.id || !!document.getElementById(r.id) ){
        console.log('err');
        console.log(r);
				return;
			}
      console.log(r);
      $scope.user = r;
      $scope.name = r.name;
      $scope.$apply();
		});
	});

  hello.subscribe('auth.logout', function(auth){
    if ($scope.name === $scope.user.name) {
      $scope.name = '';
    }
    $scope.user = null;
    $scope.$apply();
  });

  
  $scope.addMessage = function(e) {
    if (e.keyCode != 13) return;
    $scope.messages.push({from: $scope.name, body: $scope.msg});
    $scope.msg = "";
  }
  
  $scope.removeMessage = function(i) {
    $scope.messages.splice(i, 1);
  }
}
