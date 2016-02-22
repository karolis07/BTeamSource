/*

DEL USER ID SAUGOJIMO IR PERDAVIMO NAUDOTI $ROOTSCOPE.USERID

*/

document.cookie = "";

var demoApp = angular.module('demoApp',['ngRoute', 'ngCookies']);

    demoApp.config(function($routeProvider){
        $routeProvider
            .when('/',
            {
                controller: 'loginController',
                templateUrl: 'pages/login.html'
            })
            .when('/register',
            {
                controller: 'registerController',
                templateUrl: 'pages/registration.html'
            })
            .when('/contact',
            {
                controller: 'contactController',
                templateUrl: 'pages/contact.html'
            })
            .when('/history',
            {
                 controller: 'historyController',
                 templateUrl: 'pages/history.html'
            })
            .when('/home',
            {
                templateUrl: 'pages/home.html'
            })
            .when('/test',
            {
                controller: 'ContactCtrl',
                templateUrl: 'pages/test.html'
            })
            .otherwise({ redirectTo: '/'});
        });

//        demoApp.controller('loginCrtl', function($scope, $location)
//        {
//            $scope.submit = function()
//            {
//                if($scope.username == 'admin' $$ $scope.password == 'admin')
//                {
//                    $rootScope.username = $scope.username;
//                    $rootScope.password = $scope.password;
//                    $location.path('/home');
//                }else
//                {
//                    alert('Wrong stuff')
//                }
//            };
//        });

        demoApp.controller('ContactCtrl',function($scope, $http, $location)
        {
            $scope.UpdateData = function () {
                    $http.put('/US1/'+$('#inputid').val()+'/'+$('#inputFirstname').val()+'/'+$('#inputLastname').val()+'/')
                    $location.url('/home');
                };
        });

        demoApp.controller('cookieController', ['$scope', function($scope) {
            document.cookie = "someCookieName=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
            $scope.cookies = document.cookie;
        }]);


// LOGIN STUFF STARTS HERE
//       (function () {
//           'use strict';

//           angular.module('demoApp',['ngRoute', 'ngCookies'])
//               .factory('AuthenticationService', AuthenticationService)
//               .factory('UserService', UserService)
//               .controller('LoginController', LoginController)
//               .controller('contactController', contactController)
//               .controller('registerController', registerController)
//               .controller('historyController', historyController)
//               .config(config)
//               .directive('datepicker', function() {
//                                   return {
//                                       restrict: 'A',
//                                       require : 'ngModel',
//                                       link : function (scope, element, attrs, ngModelCtrl) {
//                                           $(function(){
//                                               element.datepicker({
//                                                   dateFormat:"yy-mm-dd",
//                                                   onSelect:function (date) {
//                                                       ngModelCtrl.$setViewValue(date);
//                                                       scope.$apply();
//                                                   }
//                                               });
//                                           });
//                                       }
//                                   }
//                               })
//               .run(run);
//
//           contactController.$inject = ['$scope, $http, $location'];
//           function contactController($scope, $http, $location)
//                                              {
//                                                  $scope.submit = function () {
//                                                          $http.put('/US3/'+$scope.theme+'/'+$scope.InputMessage+'/'+$scope.first_name+'/'+$scope.last_name+'/'+$scope.phone_number+'/'+$scope.email+'/'+$scope.answer+'/');
//                                                          $location.url('/home');
//                                                  };
//                                              }
//           registerController.$inject = ['$scope, $location, $http'];
//           function registerController($scope, $location, $http) {
//            $scope.submit = function(){
//                            $http.put('/US2/' + $scope.name + '/' + $scope.surname + '/' + $scope.tel + '/' + $scope.email + '/' + $scope.bank + '/' + $scope.datepicker.date + '/' + $scope.time + '/' + $scope.subject + '/' + $scope.message);
//                            $location.url('/home');
//                       };
//           }
//
//           AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService'];
//           function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService) {
//               var service = {};
//
//               service.Login = Login;
//               service.SetCredentials = SetCredentials;
//               service.ClearCredentials = ClearCredentials;
//
//               return service;
//
//               function Login(username, password, callback) {

                   /* Dummy authentication for testing, uses $timeout to simulate api call
                    ----------------------------------------------*/
//                   $timeout(function () {
//                       var response;
//                       UserService.GetByUsername(username)
//                           .then(function (user) {
//                               if (user !== null && user.password === password) {
//                                   response = { success: true };
//                               } else {
//                                   response = { success: false, message: 'Username or password is incorrect' };
//                               }
//                               callback(response);
//                           });
//                   }, 1000);

                   /* Use this for real authentication
                    ----------------------------------------------*/
//                   $http.post('/api/authenticate', { email: username, password: password })
//                       .success(function (response) {
//                           callback(response);
//                       });
//
//               }
//
//               function SetCredentials(username, password) {
//                   var authdata = Base64.encode(username + ':' + password);
//
//                   $rootScope.globals = {
//                       currentUser: {
//                           username: username,
//                           authdata: authdata
//                       }
//                   };
//
//                   $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
//                   $cookieStore.put('globals', $rootScope.globals);
//               }
//
//               function ClearCredentials() {
//                   $rootScope.globals = {};
//                   $cookieStore.remove('globals');
//                   $http.defaults.headers.common.Authorization = 'Basic';
//               }
//           }

           // Base64 encoding service used by AuthenticationService
//           var Base64 = {
//
//               keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
//
//               encode: function (input) {
//                   var output = "";
//                   var chr1, chr2, chr3 = "";
//                   var enc1, enc2, enc3, enc4 = "";
//                   var i = 0;
//
//                   do {
//                       chr1 = input.charCodeAt(i++);
//                       chr2 = input.charCodeAt(i++);
//                       chr3 = input.charCodeAt(i++);
//
//                       enc1 = chr1 >> 2;
//                       enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
//                       enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
//                       enc4 = chr3 & 63;
//
//                       if (isNaN(chr2)) {
//                           enc3 = enc4 = 64;
//                       } else if (isNaN(chr3)) {
//                           enc4 = 64;
//                       }
//
//                       output = output +
//                           this.keyStr.charAt(enc1) +
//                           this.keyStr.charAt(enc2) +
//                           this.keyStr.charAt(enc3) +
//                           this.keyStr.charAt(enc4);
//                       chr1 = chr2 = chr3 = "";
//                       enc1 = enc2 = enc3 = enc4 = "";
//                   } while (i < input.length);
//
//                   return output;
//               },
//
//               decode: function (input) {
//                   var output = "";
//                   var chr1, chr2, chr3 = "";
//                   var enc1, enc2, enc3, enc4 = "";
//                   var i = 0;
//
//                   // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
//                   var base64test = /[^A-Za-z0-9\+\/\=]/g;
//                   if (base64test.exec(input)) {
//                       window.alert("There were invalid base64 characters in the input text.\n" +
//                           "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
//                           "Expect errors in decoding.");
//                   }
//                   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
//
//                   do {
//                       enc1 = this.keyStr.indexOf(input.charAt(i++));
//                       enc2 = this.keyStr.indexOf(input.charAt(i++));
//                       enc3 = this.keyStr.indexOf(input.charAt(i++));
//                       enc4 = this.keyStr.indexOf(input.charAt(i++));
//
//                       chr1 = (enc1 << 2) | (enc2 >> 4);
//                       chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
//                       chr3 = ((enc3 & 3) << 6) | enc4;
//
//                       output = output + String.fromCharCode(chr1);
//
//                       if (enc3 != 64) {
//                           output = output + String.fromCharCode(chr2);
//                       }
//                       if (enc4 != 64) {
//                           output = output + String.fromCharCode(chr3);
//                       }
//
//                       chr1 = chr2 = chr3 = "";
//                       enc1 = enc2 = enc3 = enc4 = "";
//
//                   } while (i < input.length);
//
//                   return output;
//               }
//           };
//
//           UserService.$inject = ['$http'];
//               function UserService($http) {
//                   var service = {};
//
//                   service.GetAll = GetAll;
//                   service.GetById = GetById;
//                   service.GetByUsername = GetByUsername;
//                   service.Create = Create;
//                   service.Update = Update;
//                   service.Delete = Delete;
//
//                   return service;
//
//                   function GetAll() {
//                       return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
//                   }
//
//                   function GetById(id) {
//                       return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
//                   }
//
//                   function GetByUsername(username) {
//                       return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
//                   }
//
//                   function Create(user) {
//                       return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
//                   }
//
//                   function Update(user) {
//                       return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
//                   }
//
//                   function Delete(id) {
//                       return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
//                   }
//
//                   // private functions
//
//                   function handleSuccess(res) {
//                       return res.data;
//                   }
//
//                   function handleError(error) {
//                       return function () {
//                           return { success: false, message: error };
//                       };
//                   }
//               }
//
//           LoginController.$inject = ['$location', 'AuthenticationService'];
//               function LoginController($location, AuthenticationService) {
//                   var vm = this;
//
//                   vm.login = login;
//
//                   (function initController() {
//                       // reset login status
//                       AuthenticationService.ClearCredentials();
//                   })();
//
//                   function login() {
//                       vm.dataLoading = true;
//                       AuthenticationService.Login(vm.username, vm.password, function (response) {
//                           if (response.success) {
//                               AuthenticationService.SetCredentials(vm.username, vm.password);
//                               $location.path('/home');
//                           } else {
////                               FlashService.Error(response.message);
//                               $location.path('/register');
//                           }
//                       });
//                   };
//               }
//
//               config.$inject = ['$routeProvider', '$locationProvider'];
//               function config($routeProvider, $locationProvider) {
//                       $routeProvider
//                        .when('/',
//                                   {
//                                       controller: 'LoginController',
//                                       templateUrl: 'pages/login.html',
//                                       controllerAs: 'vm'
//                                   })
//                                   .when('/register',
//                                   {
//                                       controller: 'registerController',
//                                       templateUrl: 'pages/registration.html',
//                                       controllerAs: 'vm'
//                                   })
//                                   .when('/contact',
//                                   {
//                                       controller: 'contactController',
//                                       templateUrl: 'pages/contact.html',
//                                       controllerAs: 'vm'
//                                   })
//                                   .when('/history',
//                                   {
//                                        controller: 'historyController',
//                                        templateUrl: 'pages/history.html',
//                                        controllerAs: 'vm'
//                                   })
//                                   .when('/home',
//                                   {
//                                       templateUrl: 'pages/home.html'
//                                   })
//                                   .when('/test',
//                                   {
//                                       controller: 'ContactCtrl',
//                                       templateUrl: 'pages/test.html',
//                                       controllerAs: 'vm'
//                                   })
//                                   .otherwise({ redirectTo: '/'});
//                               }
//               run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
//                   function run($rootScope, $location, $cookieStore, $http) {
//                       // keep user logged in after page refresh
//                       $rootScope.globals = $cookieStore.get('globals') || {};
//                       if ($rootScope.globals.currentUser) {
//                           $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//                       }
//
//                       $rootScope.$on('$locationChangeStart', function (event, next, current) {
//                           // redirect to login page if not logged in and trying to access a restricted page
//                           var restrictedPage = $.inArray($location.path(), ['//', '/register']) === -1;
//                           var loggedIn = $rootScope.globals.currentUser;
//                           if (restrictedPage && !loggedIn) {
//                               $location.path('/');
//                           }
//                       });
//                   }

//       })();
// LOGIN STUFF ENDS HERE

        demoApp.controller('languages',['$scope', '$http', '$rootScope', '$templateCache',function($scope, $http, $rootScope, $templateCache) {

            $scope.fetch = function() {
                $scope.code = null;
                $scope.response = null;
                $scope.url = "/en";
                $scope.bla = $rootScope;

                $scope.a = function(){
                    $scope.data = $rootScope.data;
                };

                $http({method: 'GET', url: $scope.url, cache: $templateCache}).
                then(function(response) {
                    $scope.status = response.status;
                    $scope.data = response.data;
                    $rootScope.data = $scope.data;
                }, function(response) {
                    $scope.data = response.data || "Request failed";
                    $scope.status = response.status;
                    $rootScope.data = $scope.data;
                });
            };
        }]);

        demoApp.controller('loginController', ['$scope', '$http', '$window',
            function($scope, $http, $window){
                $scope.login = function() {
                       var email = $( "#email" ).val();
                       var password = $( "#password" ).val();
                       $http({
                           method: 'POST',
                           url:'/api/authenticate',
                           data: { "email": email, "pass": password }
                       }).then(function successCallback(response) {
                                     if(response.data !== "")
                                     {
                                        $rootScope.user = response.data;
                                        $window.location.href = '#/home';
                                     }//else
//                                     {
//                                        $("#wrongPassword").show();
//                                        setTimeout(function(){ $("#wrongPassword").hide(); }, 3000);
//                                     }
                                   }, function errorCallback(response) {
                                        alert("Problemos su interneto ryšiu");
                                   });
                    }
            }]);



        demoApp.directive('datepicker', function() {
                    return {
                        restrict: 'A',
                        require : 'ngModel',
                        link : function (scope, element, attrs, ngModelCtrl) {
                            $(function(){
                                element.datepicker({
                                    dateFormat:"yy-mm-dd",
                                    onSelect:function (date) {
                                        ngModelCtrl.$setViewValue(date);
                                        scope.$apply();
                                    }
                                });
                            });
                        }
                    }
                });

        demoApp.controller('contactController',function($scope, $http, $location)
        {
            $scope.submit = function () {
                    $http.put('/US3/'+$scope.theme+'/'+$scope.InputMessage+'/'+$scope.first_name+'/'+$scope.last_name+'/'+$scope.phone_number+'/'+$scope.email+'/'+$scope.answer+'/');
                    $location.url('/home');
            };
        });

        demoApp.controller('registerController', function($scope, $location, $http) {


           $scope.submit = function(){
                $http.put('/US2/' + $scope.name + '/' + $scope.surname + '/' + $scope.tel + '/' + $scope.email + '/' + $scope.bank + '/' + $scope.datepicker.date + '/' + $scope.time + '/' + $scope.subject + '/' + $scope.message);
                $location.url('/home');
           };



           angular.element(document).ready(function () {
                var date_input=$('input[name="date"]'); //our date input has the name "date"
                var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
                date_input.datepicker({
                    format: 'yyyy-mm-dd',
                    container: container,
                    todayHighlight: true,
                    autoclose: true,
                })
           });
        });

        demoApp.controller('historyController',['$scope', '$http', '$templateCache',function($scope, $http, $templateCache) {

            $scope.delete = function() {
                $http.delete('/del/' + $scope.data.userID + '/' + $scope.checkbox);
                $location.url('/history');
            }

            $scope.fetch = function() {
            $scope.code = null;
            $scope.response = null;

            $http({method: 'GET', url: '/api/history/getall', cache: $templateCache}).
              then(function(response) {
                $scope.status = response.status;
                $scope.data = response.data;
              }, function(response) {
                $scope.data = response.data || "Request failed";
                $scope.status = response.status;
            });
          };
        }]);



