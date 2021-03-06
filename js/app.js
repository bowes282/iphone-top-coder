var app = angular.module("app", ['ngRoute', 'ngAnimate', 'ngTouch']);

//url mapping
app.config(function($routeProvider) {
        $routeProvider
                .when('/Dashboard/Default',
                        {
                                controller: 'defaultController',
                                templateUrl: 'partials/default.html',
                                title: 'logo'
                        })
                .when('/Dashboard/ToRead',
                        {
                                controller: 'toReadController',
                                templateUrl: 'partials/toRead.html',
                                title: 'To Read'
                        })
                .when('/Dashboard/Interests',
                        {
                                controller: 'interestsController',
                                templateUrl: 'partials/interests.html',
                                title: 'Interests Page'
                        })
                .when('/Dashboard/Search',
                        {
                                controller: 'searchController',
                                templateUrl: 'partials/search.html',
                                title: 'Search'
                        })
                .when('/Category/Technology',
                        {
                                controller: 'categoryController',
                                templateUrl: 'partials/category.html',
                                title: 'Technology'
                        })
                .when('/Category/Design',
                        {
                                controller: 'categoryController',
                                templateUrl: 'partials/category.html',
                                title: 'Design'
                        })
                .when('/ItemDetail/:itemnum',
                        {
                                controller: 'itemDetailController',
                                templateUrl: 'partials/itemdetail.html',
                                title: ''
                        })
		.when('/Comments/:itemnum',
                        {
                                controller: 'commentsController',
                                templateUrl: 'partials/comment.html',
                                title: ''
                        })
                .otherwise(
                        {
                                redirectTo: '/Dashboard/Default'
                        }

                );
});


app.service('dataService', function($http, $route) {


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

        this.getSearch = function() {
                return $http.get('data/searchpush.json', {
                        'cache': true
                });
        };

        this.doSearch = function(data) {
                //should use $http.post
                return  $http.get('data/dosearch.json', {
                        'cache': true
                });
//                return  $http.post('data/dosearch.json', data ,{
//                        'cache': true
//                });

        };

        this.getDefault = function() {
	//should use $http.post
                return $http.get('data/default.json', {
                        'cache': true
                });
//                return  $http.post('data/default.json', data ,{
//                        'cache': true
//                });

        };


        this.getCategoryData = function() {
                var title = $route.current.title;
                var url;
                if (title === 'Technology') {
                        url = 'data/technology.json';
                } else if (title === 'Design') {
                        url = 'data/design.json';
                }

                return  $http.get(url, {
                        'cache': true
                });
        };

        this.getItemDetail = function(data) {
                //should use $http.post
                return  $http.get('data/itemdetail.json', {
                        'cache': true
                });
//                return  $http.post('data/itemdetail.json', data ,{
//                        'cache': true
//                });

        };

	this.getComments = function(data){
		 return  $http.get('data/comments.json', {
                        'cache': true
                });
	};


});



app.controller('bodyController', function($scope, $route, $location,$rootScope ,$timeout) {
        $scope.slideDirection = null;
        $scope.navon = false;
        $rootScope.hideafterload = false;

         $timeout(function(){
                  $rootScope.hideafterload = true;  //delay 100ms seconds show splash
         },400);

        $scope.$on("$routeChangeSuccess", function(event, newUrl, oldUrl) {

                try {
                        //if user hit back then slide from left else slide from right
                        if (isgoBack) {
                                $scope.slideDirection = 'slide-from-left';
                        } else {
                                $scope.slideDirection = 'slide-from-right';

                        }
                        isgoBack = false;     
                                        
                        if (!oldUrl) { //disable slide if firstload
                                $scope.slideDirection = null;
                        }

                        //close nav bar when animation complete
                       // $scope.offNav();
                        window.setTimeout(function() {
                                $scope.$apply(function() {
                                        $scope.offNav();
                                });
                        });

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

	var isgoBack = false;
	$scope.goBack = function(){
		 isgoBack = true;
                                     window.history.back();
	};


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

app.controller('defaultController', function($scope, dataService ,$rootScope , $timeout) {
        
        dataService.getDefault().success(function(data) {
                $scope.defaults = data;
        });

});


app.controller('toReadController', function($scope, dataService) {
        dataService.getToRead().success(function(data) {
                $scope.toreads = data;

        });

});


app.controller('interestsController', function($scope, dataService) {
        dataService.getInterests().success(function(data) {
                $scope.interests = data;

        });

});

app.controller('searchController', function($scope, dataService) {

        dataService.getSearch().success(function(data) {
                $scope.searchbefore = data;
        });

        var timer;
        $scope.doSearch = function() {
                window.clearTimeout(timer);
                if ($scope.searchInput == "") {
                        $scope.show = true;
                        return;
                }

                timer = window.setTimeout(function() {
                        dataService.doSearch($scope.searchInput).success(function(data) {
                                $scope.searchafter = data;
                                $scope.show = false;
                        });

                }, 400);
        };

        $scope.show = true;
        $scope.topicLimit = 3;
        $scope.tweetLimit = 2;
        $scope.movieLimit = 3;



        $scope.noTopicLimit = function() {
                $scope.topicLimit = $scope.searchafter.topics.length;

        };

        $scope.notweetLimit = function() {
                $scope.tweetLimit = $scope.searchafter.tweets.length;
        };


        $scope.nomovieLimit = function() {
                $scope.movieLimit = $scope.searchafter.movies.length;
        };
});


app.controller('categoryController', function($scope, dataService, $filter) {
        dataService.getCategoryData().success(function(data) {
                $scope.items = data;
        });
        $scope.currentPage = 1;
        $scope.pageSize = 2;
        $scope.pageCount = 3;

        $scope.getItems = function() {
                return $filter('range')($scope.items, $scope.currentPage, $scope.pageSize);
        };

        $scope.getPageList = function() {
                return $filter('pageList')($scope.items, $scope.currentPage, $scope.pageSize, $scope.pageCount);
        };

        $scope.isactive = function(page) {
                if ($scope.currentPage === page) {
                        return true;
                } else {
                        return false;
                }
        };

        $scope.selectPage = function(page) {
                $scope.currentPage = page;
        };

        $scope.selectPrev = function() {
                if ($scope.currentPage === 1) {
                        return;
                } else {
                        $scope.currentPage -= 1;
                }

        };

        $scope.selectNext = function() {
                if ($scope.currentPage === Math.ceil($scope.items.length / $scope.pageSize)) {
                        return;
                } else {
                        $scope.currentPage += 1;
                }

        };



});



app.controller('itemDetailController', function($scope, $routeParams, dataService, $sce) {

        dataService.getItemDetail($routeParams.itemnum).success(function(data) {
                $scope.itemdetail = data;
                $scope.rate = data.rate;
                $scope.starfull = getStars();
                $scope.itemdetail.videosrc = $sce.trustAsResourceUrl(data.videosrc);
        });

        function getStars() {
                var starfull = Math.floor($scope.rate);

                if ($scope.rate === starfull) {
                        $scope.starhalf = false;

                } else {
                        $scope.starhalf = true;

                }
                return new Array(starfull);
        };

	$scope.doshare = function(){
		$scope.share.visible = true;

	};



});

app.controller('commentsController', function($scope, dataService ,$routeParams ,$anchorScroll ,$location ,$route ){

	dataService.getComments($routeParams.itemnum).success(function(data){
		$scope.comments = data;

	});

	$scope.reply = function(){
		 $route.current.$$route.direction = ""; //remove slide effect because of anchorscroll
		 $location.hash('usercomments');

		if( !$scope.usercomments || $scope.usercomments === ""){ //if no comment then scroll to textarea
			$anchorScroll();
		}else{
			//do some post requrest
		}
	};

	$scope.doshare = function(){
		$scope.share.visible = true;

	};

});


//pagination filter
app.filter("range", function() {
        return function(data, curpage, size) {
                if (!angular.isArray(data)) {
                        return;
                }
                return data.slice((curpage - 1) * size, curpage * size);
        };
});

app.filter("pageList", function() {
        return function(data, curpage, size, pageCount) {
                if (angular.isArray(data)) {
                        var result = [];
                        var page_count = Math.ceil(data.length / size);

                        var start = Math.max(1, curpage - parseInt(pageCount / 2));
                        var end = Math.min(page_count, start + pageCount - 1);
                        start = Math.max(1, end - pageCount + 1);

                        for (var i = start; i <= end; i++) {
                                result.push(i);
                        }

                        return result;
                } else {
                        return data;
                }
        };
});



app.directive('share' , function(){
	return {
		restrict: "EAC",
		templateUrl: "partials/share.html",
		//scope: true,
		controller : function($scope){
			$scope.share =  {};
			var share = $scope.share;

			share.visible = false;

			share.hideSocialLogin = function(){
				share.visible = false;
			};
			share.facebookLogin = function(){
				$scope.sharelogin.visible = true;
				$scope.sharelogin.name = "FaceBook";
			};
			share.twitterLogin = function(){
				$scope.sharelogin.visible = true;
				$scope.sharelogin.name = "Twitter";
			};

		}
	 };

});


app.directive('sharelogin' , function(){
	return {
		restrict: "EAC",
		templateUrl: "partials/sharelogin.html",
		//scope: true,
		controller : function($scope){
			 $scope.sharelogin =  {};
			var sharelogin = $scope.sharelogin;

			sharelogin.visible = false;
			sharelogin.hideSocialLogin = function(){
				sharelogin.visible = false;
			};
			//you can put sharelogin username and password here
		}
	 };

});

