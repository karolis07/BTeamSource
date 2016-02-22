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
                resolve: {
                    "check": function($location, $rootScope) {
                        if(!$rootScope.loggedIn){
                            $location.path('/');
                        }
                    }
                },
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

        demoApp.controller('loginController', ['$scope', '$location', '$rootScope', '$http',
         function($scope, $location, $rootScope, $http){
            $scope.submit = function() {

                $http.get('/api/authenticate/' + $scope.email + '/' + $scope password)
                .success(function(response){
                    $rootScope.loggedIn = true;
                    $location.path('/home');
                });


            }

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



//           angular.element(document).ready(function () {
//                var date_input=$('input[name="date"]'); //our date input has the name "date"
//                var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
//                date_input.datepicker({
//                    format: 'yyyy-mm-dd',
//                    container: container,
//                    todayHighlight: true,
//                    autoclose: true,
//                })
//           });
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



