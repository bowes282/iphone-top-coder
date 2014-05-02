var app = angular.module("app", ['ngRoute', 'ngAnimate','ngTouch']);

//url mapping
app.config(function($routeProvider) {
        $routeProvider
                .when('/Dashboard/Default',
                        {
                                //controller: 'bodyController',
                                templateUrl: 'partials/default.html',
                                direction: 'left',
                                title: 'logo'
                        })
                .when('/Dashboard/ToRead',
                        {
                                controller: 'toReadController',
                                templateUrl: 'partials/toRead.html',
                                direction: 'left',
                                title: 'To Read'
                        })
                        .when('/Dashboard/Interests',
                        {
                                controller: 'interestsController',
                                templateUrl: 'partials/interests.html',
                                direction: 'left',
                                title: 'Interests Page'
                        })
                .otherwise(
                        {
                                redirectTo: '/Dashboard/Default'
                        }

                );
});


app.service('dataService',function($http){
        

        this.getToRead = function() {
                return $http.get('data/toread.json', {
                        'cache': true
                });
        };
        this.getInterests = function(){
               return $http.get('data/interests.json', {
                        'cache': true
                }); 
        };
        
        
});



app.controller('bodyController', function($scope ,$route ,$location){
       $scope.slideDirection = null; //一般留空
    $scope.navon = false;

//$routeChangeSuccess
//        $scope.$on("$locationChangeStart", function(event ,newUrl, oldUrl) {
//        console.log('ddd');
//        
//        
//});
         $scope.$on("$routeChangeSuccess", function(event ,newUrl, oldUrl) {
                try {
                        switch($route.current.direction){
                                case 'left' :
                                        $scope.slideDirection  = 'slide-from-left';
                                        break;
                                case 'right':
                                        $scope.slideDirection  = 'slide-from-right';
                                        break;
                                default:
                                        $scope.slideDirection  = null;
                        }
                        
                        if(!oldUrl){ //disable slide if firstload
                                $scope.slideDirection  = null;
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
 
 
 

    $scope.toggleNav = function(){
            $scope.navon =  !$scope.navon;
    };
    
    $scope.offNav = function(){
            $scope.navon = false;
    };
     $scope.onNav = function(){
            $scope.navon = true;
    };
    
    $scope.go = function(path){
             $scope.offNav();
            $location.path(path);
           
    };


});


app.controller('toReadController',function($scope, dataService){
        var self = this;
        dataService.getToRead().success(function(data){
                  angular.extend(self, data);
                  
        });
        
});


app.controller('interestsController',function($scope, dataService){
        var self = this;
        dataService.getInterests().success(function(data){
                  angular.extend(self, data);
                  
        });
        
});


