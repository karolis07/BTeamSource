'use strict';
app.factory('loginService',function($http, $location, sessionService){
	return{
		login:function(data,scope){
			var $promise=$http.post('/api/authenticate/'+data); //send data to api/authenticate
			$promise.then(function(msg){
				var uid=msg.data;
				if(uid){
					//scope.msgtxt='Correct information';
					sessionService.set('uid',uid);
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