'use strict';
demoApp.factory('loginService',function($http, $location){
	return{
		login:function(data,scope){
			var $promise=$http.post('/api/authenticate/'+data); //send data to api/authenticate
			$promise.then(function(msg){
				var uid=msg.data;
				if(uid){
					//scope.msgtxt='Correct information';
					$location.path('/home');
				}
				else  {
					scope.msgtxt='incorrect information';
					$location.path('/');
				}
			});
		}


	}

});