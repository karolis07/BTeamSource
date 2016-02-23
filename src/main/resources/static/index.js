var demoApp = angular.module('demoApp',['ngRoute', 'ngCookies']);

    demoApp.config(function($routeProvider){
        $routeProvider
            .when('/',
            {
                resolve: {
                    "check": function($location, $cookies) {
                        var login = $cookies.get('login');
                        if(login == null){
                            $location.path('/');
                        } else {
                            $location.path('/home');
                        }
                    }
                },
                controller: 'loginController',
                templateUrl: 'pages/login.html'
            })
            .when('/register',
            {
            resolve: {
                                "check": function($location, $cookies) {
                                var login = $cookies.get('login');
                                    if(login == null){
                                        $location.path('/');
                                    }
                                }
                            },
                controller: 'registerController',
                templateUrl: 'pages/registration.html'
            })
            .when('/contact',
            {
            resolve: {
                                "check": function($location, $cookies) {
                                var login = $cookies.get('login');
                                    if(login == null){
                                        $location.path('/');
                                    }
                                }
                            },
                controller: 'contactController',
                templateUrl: 'pages/contact.html'
            })
            .when('/history',
            {
            resolve: {
                                            "check": function($location, $cookies) {
                                            var login = $cookies.get('login');
                                                if(login == null){
                                                    $location.path('/');
                                                }
                                            }
                                        },
                controller: 'historyController',
                 templateUrl: 'pages/history.html'
            })
            .when('/home',
            {
                resolve: {
                    "check": function($location, $cookies) {
                    var login = $cookies.get('login');
                        if(login == null){
                            $location.path('/');
                        }
                    }
                }, // pagal ideja galima ji iskelt pries visus routes
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

        demoApp.controller('loginController', ['$cookies', '$scope', '$location', '$rootScope', '$templateCache', '$http',
            function($cookies, $scope, $location, $rootScope, $templateCache, $http){
                $scope.submit = function() {
                    $scope.code = null;
                    $scope.response = null;
                    $scope.url = "/api/authenticate";

                    $http({method: 'POST', url: $scope.url, data: {"email": $scope.email, "password": $scope.password}}).
                    then(function successCallback(response) {
                        if(response.data != "-1")
                        {
                            $rootScope.userID = response.data;
                            $cookies.put('login', 'true');
                            $cookies.put('userID', response.data);
                            $location.path('/home');
                        }}, function errorCallback(response)
                        {
                            $location.path('/');
                            alert("Error");
                        }
                    );
                }

            }]);

        demoApp.controller('languages',['$location', '$cookies', '$scope', '$http', '$rootScope', '$templateCache',function($location, $cookies, $scope, $http, $rootScope, $templateCache) {

            $scope.ltLanguage = function() {
                $scope.code = null;
                $scope.response = null;
                $scope.bla = $rootScope;
                $scope.url = "/lt";

                $cookies.put('language', 'lt');

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

            $scope.logout = function(){
                $cookies.remove('login');
                $cookies.remove('userID');
                $location.path('/');
            };

            $scope.enLanguage = function() {
                $scope.code = null;
                $scope.response = null;
                $scope.bla = $rootScope;
                $scope.url = "/en";

                $cookies.put('language', 'en');

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

            $scope.fetch = function() {
                var cookie = $cookies.get('language');

                    $scope.code = null;
                    $scope.response = null;
                    $scope.bla = $rootScope;

                    if ((cookie == null) || (cookie == "lt")) {
                        $scope.url = "/lt";
                        $cookies.put('language', 'lt');
                    } else if (cookie == "en"){
                        $scope.url = "/en";
                        $cookies.put('language', 'en');
                    }

                    $http({method: 'GET', url: $scope.url, cache: $templateCache}).then(function (response) {
                        $scope.status = response.status;
                        $scope.data = response.data;
                        $rootScope.data = $scope.data;
                    }, function (response) {
                        $scope.data = response.data || "Request failed";
                        $scope.status = response.status;
                        $rootScope.data = $scope.data;
                    });

            };
        }]);

        demoApp.controller('changeLanguage', function($scope) {

        });

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

        });

        demoApp.controller('historyController',['$location', '$cookies', '$scope', '$rootScope', '$http', '$templateCache',function($location, $cookies, $scope, $rootScope, $http, $templateCache) {

            var userID = $cookies.get('userID');
            var ID = null;

            $scope.delete = function(ID) {
                $http.get('/api/history/delete/' + userID + "/" + ID);
                $location.url('/history');
            };

            $scope.view = function(ID) {
                $http.get('/api/history/view/' + userID + "/" + ID);
                $location.url('/history');
            };

            $scope.fetch = function() {
                $scope.code = null;
                $scope.response = null;
                $scope.url = "/api/history/getall/" + userID;

                $http({method: 'GET', url: $scope.url, cache: $templateCache}).
                  then(function(response) {
                    $scope.statusHistory = response.status;
                    $rootScope.dataHistory = response.data;
                  }, function(response) {
                    $scope.dataHistory = response.data || "Request failed";
                    $rootScope.statusHistory = response.status;
                });
            };
        }]);



