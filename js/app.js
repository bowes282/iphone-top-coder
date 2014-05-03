var app = angular.module("app", ['ngRoute', 'ngAnimate', 'ngTouch']);

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
                .when('/Dashboard/Search',
                        {
                                controller: 'searchController',
                                templateUrl: 'partials/search.html',
                                direction: 'left',
                                title: 'Search'
                        })
                .otherwise(
                        {
                                redirectTo: '/Dashboard/Default'
                        }

                );
});


app.service('dataService', function($http) {


        this.getToRead = function() {
                return $http.get('data/toRead.json', {
                        'cache': true
                });
        };
        this.getInterests = function() {
                return $http.get('data/interests.json', {
                        'cache': true
                });
        };

        this.getSearch =  function(){
                return $http.get('data/searchpush.json', {
                        'cache': true
                });
        };
        
        this.doSearch = function(data){

                //should use $http.post 
                return  $http.get('data/dosearch.json',{
                        'cache': true
                });
//                return  $http.post('data/dosearch.json', data ,{
//                        'cache': true
//                });

        };

});



app.controller('bodyController', function($scope, $route, $location) {
        $scope.slideDirection = null;
        $scope.navon = false;

        $scope.$on("$routeChangeSuccess", function(event, newUrl, oldUrl) {
                try {
                        //get slide direction from url mappings
                        switch ($route.current.direction) {
                                case 'left' :
                                        $scope.slideDirection = 'slide-from-left';
                                        break;
                                case 'right':
                                        $scope.slideDirection = 'slide-from-right';
                                        break;
                                default:
                                        $scope.slideDirection = null;
                        }

                        if (!oldUrl) { //disable slide if firstload
                                $scope.slideDirection = null;
                        }
                        
                        //close nav bar when animation complete
                        window.setTimeout(function() {
                                $scope.$apply(function() {
                                        $scope.offNav();
                                });
                        }, 400);

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



        var lock = false;//prevent dblclick bugs
        $scope.toggleNav = function() {
                if (lock) {
                        return;
                }

                $scope.navon = !$scope.navon;
                lock = true;
                window.setTimeout(function() {
                        lock = false;
                }, 400);
        };

        $scope.offNav = function() {
                $scope.navon = false;
        };
        $scope.onNav = function() {
                $scope.navon = true;
        };

        $scope.go = function(path) {

                if (path === $location.path()) {
                        $scope.offNav();
                } else {
                        $location.path(path);
                }
        };


});


app.controller('toReadController', function($scope, dataService) {
        var self = this;
        dataService.getToRead().success(function(data) {
                angular.extend(self, data);

        });

});


app.controller('interestsController', function($scope, dataService) {
        var self = this;
        dataService.getInterests().success(function(data) {
                angular.extend(self, data);

        });

});

app.controller('searchController', function($scope, dataService) {
        
        dataService.getSearch().success(function(data){
                $scope.searchbefore = data;
        });
        
        var timer;
        $scope.doSearch = function(){
                window.clearTimeout(timer);
                
                timer = window.setTimeout(function(){
                                dataService.doSearch().success(function(data){
                                        $scope.searchafter = data;
                                        $scope.show = false;
                                });
                        
                        
                },400);
        };
        
         $scope.show = true;
         $scope.topicLimit = 3;
         $scope.tweetLimit = 2;
         $scope.movieLimit = 3;
         

 
       $scope.noTopicLimit = function(){
               $scope.topicLimit = $scope.searchafter.topics.length;

       };
       
      $scope.notweetLimit = function(){
               $scope.tweetLimit = $scope.searchafter.tweets.length;
       };
       
       
       $scope.nomovieLimit = function(){
               $scope.movieLimit = $scope.searchafter.movies.length;
       };
 

        
});

