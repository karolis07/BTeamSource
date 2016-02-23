/*

DEL USER ID SAUGOJIMO IR PERDAVIMO NAUDOTI $ROOTSCOPE.USERID

*/
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
/*


//var email = $( "#emailField" ).val();
//    var password = $( "#passwordField" ).val();
//    $http({
//        method: 'POST',
//                url: $rootScope.url+'/authenticate',
//                data: { "email": email, "pass": password }
//    }).then(function successCallback(response) {
//        if(response.data != "")
//        {
//        $rootScope.user = response.data;
//        $window.location.href = '/#/home';
//        }else
//        {
//        $("#wrongPassword").show();
//        setTimeout(function(){ $("#wrongPassword").hide(); }, 3000);
//        }
//        }, function errorCallback(response) {
//        alert("Problemos su interneto ryšiu");
//        });

        demoApp.controller('loginController', ['$scope', '$location', '$rootScope', '$templateCache', '$http',
         function($scope, $location, $rootScope, $templateCache, $http){
            $scope.submit = function() {
                $scope.code = null;
                $scope.response = null;
                $scope.url = "/api/authenticate";

                $http({method: 'POST', url: $scope.url, data: {"email": $scope.email, "password": $scope.password}}).
                                then(function successCallback(response) {
                                    if(response.data != "-1")
                                    {
                                        $rootScope.userID = response.data;
                                        $location.path('/home');
                                    }. function errorCallback(response)
                                    {
                                        alert("Error");
                                    }
                                    })

//                if($rootScope.userID != '-1')
//                {
//                    $rootScope.loggedIn = true;
//                }
//                else
//                {
//                    $rootScope.loggedIn = false;
//                }

//                if($scope.email == 'admin@admin.lt' && $scope.password == 'admin'){
//
//                    $rootScope.loggedIn = true;
//                    $location.path('/home');
//                }
            }

        }]);*/

        demoApp.controller('loginController', ['$scope', '$location', '$rootScope', '$templateCache', '$http',
            function($scope, $location, $rootScope, $templateCache, $http){
                $scope.submit = function() {
                    $scope.code = null;
                    $scope.response = null;
                    $scope.url = "/api/authenticate";

                    $http({method: 'POST', url: $scope.url, data: {"email": $scope.email, "password": $scope.password}}).
                    then(function successCallback(response) {
                        if(response.data != "-1")
                        {
                            $rootScope.userID = response.data;
                            $location.path('/home');
                        }}, function errorCallback(response)
                        {
                            alert("Error");
                        }
                    );

        //                if($rootScope.userID != '-1')
        //                {
        //                    $rootScope.loggedIn = true;
        //                }
        //                else
        //                {
        //                    $rootScope.loggedIn = false;
        //                }

        //                if($scope.email == 'admin@admin.lt' && $scope.password == 'admin'){
        //
        //                    $rootScope.loggedIn = true;
        //                    $location.path('/home');
        //                }
                }

            }]);

        demoApp.controller('languages',['$cookies', '$scope', '$http', '$rootScope', '$templateCache',function($cookies, $scope, $http, $rootScope, $templateCache) {

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
            $scope.url = "/api/history/getall";

            $http({method: 'GET', url: $scope.url, cache: $templateCache}).
              then(function(response) {
                $scope.status = response.status;
                $scope.data = response.data;
              }, function(response) {
                $scope.data = response.data || "Request failed";
                $scope.status = response.status;
            });
          };
        }]);



