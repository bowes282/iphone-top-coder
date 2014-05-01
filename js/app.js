var app = angular.module("app", ['ngRoute', 'ngAnimate','ngTouch']);

//url mapping
app.config(function($routeProvider) {
        $routeProvider
                .when('/Dashboard/Default',
                        {
                                controller: 'bodyController',
                                templateUrl: 'partials/default.html',
                                right: true,
                                title: 'logo'
                        })
                .otherwise(
                        {
                                redirectTo: '/Dashboard/Default',
                                right: true,
                                title: 'logo'
                        }

                );

});


app.controller('bodyController', function($scope ,$route){
    var slideDirection = 'slide-left-animate'; //一般留空
    $scope.navon = false;


        $scope.$on("$locationChangeStart", function(event) {
                //event.preventDefault();
                try {
                        if ($route.current.right) {
                                slideDirection = 'slide-right-animate';
                        } else {
                                slideDirection = 'slide-left-animate';
                        }

                        //if islogo display logo ,else display title
                         $scope.title = $route.current.title;
                        if ($scope.title === 'logo') {
                                $scope.islogo = true;
                        } else {
                                $scope.islogo = false;
                        }
                } catch (e) {
                }
        });



    $scope.getSlide = function() {
	return slideDirection;
    };

    $scope.toggleNav = function(){
            $scope.navon =  !$scope.navon;
    };


});


