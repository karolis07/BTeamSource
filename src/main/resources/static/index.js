/*

DEL USER ID SAUGOJIMO IR PERDAVIMO NAUDOTI $ROOTSCOPE.USERID

*/

document.cookie = "";

var authentication = angular.module('Authentication', []);
var home = angular.module('Home', []);
var demoApp = angular.module('demoApp',['ngRoute', 'ngCookies', 'Authentication', 'Home']);

    demoApp.config(function($routeProvider){
        $routeProvider
            .when('/',
            {
                controller: 'LoginController',
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
//------------------------------------IF PROBLEMS WITH LOGIN, COMMENT CODE BELOW---------------------------
        demoApp.run(['$rootScope', '$location', '$cookieStore', '$http',

                    function ($rootScope, $location, $cookieStore, $http) {

                        // keep user logged in after page refresh
                        $rootScope.globals = $cookieStore.get('globals') || {};
                        if ($rootScope.globals.currentUser) {
                            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
                        }
                        $rootScope.$on('$locationChangeStart', function (event, next, current) {
                            // redirect to login page if not logged in
                            if ($location.path() !== '/' && !$rootScope.globals.currentUser) {
                                $location.path('/');
                            }
                        });
                    }]);

        authentication.factory('AuthenticationService',
                           ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
                           function (Base64, $http, $cookieStore, $rootScope, $timeout) {
                                                      var service = {};

                               service.Login = function (username, password, callback) {

                             /* Use this for real authentication

                                    ----------------------------------------------*/

                                   $http.get('/api/authenticate/' + $scope.username + '/' + $scope.password)
                                       .success(function (response) {
                                           callback(response);
                                      });
                               };
                               service.SetCredentials = function (username, password) {
                                   var authdata = Base64.encode(username + ':' + password);

                                   $rootScope.globals = {
                                       currentUser: {
                                           username: username,

                                           authdata: authdata
                                       }
                                   };

                                   $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line

                                   $cookieStore.put('globals', $rootScope.globals);

                               };

                               service.ClearCredentials = function () {

                                   $rootScope.globals = {};

                                   $cookieStore.remove('globals');

                                   $http.defaults.headers.common.Authorization = 'Basic ';

                               };

                               return service;

                           }])
                           .factory('Base64', function () {
                               /* jshint ignore:start */

                                  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

                                  return {
                                      encode: function (input) {
                                          var output = "";
                                          var chr1, chr2, chr3 = "";
                                          var enc1, enc2, enc3, enc4 = "";
                                          var i = 0;

                                          do {

                                              chr1 = input.charCodeAt(i++);
                                              chr2 = input.charCodeAt(i++);
                                              chr3 = input.charCodeAt(i++);

                                              enc1 = chr1 >> 2;
                                              enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                                              enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                                              enc4 = chr3 & 63;

                                              if (isNaN(chr2)) {

                                                  enc3 = enc4 = 64;

                                              } else if (isNaN(chr3)) {

                                                  enc4 = 64;

                                              }

                                              output = output +
                                                  keyStr.charAt(enc1) +
                                                  keyStr.charAt(enc2) +
                                                  keyStr.charAt(enc3) +
                                                  keyStr.charAt(enc4);

                                              chr1 = chr2 = chr3 = "";
                                              enc1 = enc2 = enc3 = enc4 = "";
                                          } while (i < input.length);

                                          return output;
                                      },

                                      decode: function (input) {

                                          var output = "";
                                          var chr1, chr2, chr3 = "";
                                          var enc1, enc2, enc3, enc4 = "";
                                          var i = 0;

                                          // remove all characters that are not A-Z, a-z, 0-9, +, /, or =

                                          var base64test = /[^A-Za-z0-9\+\/\=]/g;
                                          if (base64test.exec(input)) {
                                              window.alert("There were invalid base64 characters in the input text.\n" +

                                                  "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +

                                                  "Expect errors in decoding.");

                                          }
                                          input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                                          do {

                                              enc1 = keyStr.indexOf(input.charAt(i++));
                                              enc2 = keyStr.indexOf(input.charAt(i++));
                                              enc3 = keyStr.indexOf(input.charAt(i++));
                                              enc4 = keyStr.indexOf(input.charAt(i++));


                                              chr1 = (enc1 << 2) | (enc2 >> 4);
                                              chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                                              chr3 = ((enc3 & 3) << 6) | enc4;


                                              output = output + String.fromCharCode(chr1);


                                              if (enc3 != 64) {

                                                  output = output + String.fromCharCode(chr2);

                                              }

                                              if (enc4 != 64) {

                                                  output = output + String.fromCharCode(chr3);

                                              }

                                              chr1 = chr2 = chr3 = "";
                                              enc1 = enc2 = enc3 = enc4 = "";

                                          } while (i < input.length);

                                          return output;

                                      }

                                  };

                                  /* jshint ignore:end */

                              });

        authentication.controller('LoginController',

                           ['$scope', '$rootScope', '$location', 'AuthenticationService',

                           function ($scope, $rootScope, $location, AuthenticationService) {

                               // reset login status

                               AuthenticationService.ClearCredentials();



                               $scope.login = function () {

                                   $scope.dataLoading = true;

                                   AuthenticationService.Login($scope.username, $scope.password, function(response) {

                                       if(response.success) {

                                           AuthenticationService.SetCredentials($scope.username, $scope.password);

                                           $location.path('/home');

                                       } else {

                                           $scope.error = response.message;

                                           $scope.dataLoading = false;

                                       }

                                   });

                               };

                           }]);
////////////--------------------------------IF PROBLEMS WITH LOGIN, COMMENT THE CODE ABOVE-----------------------


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



