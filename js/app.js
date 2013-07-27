// Angular App sits here

var app = angular.module('ng-movies', []);

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/search.html',
    controller: 'SearchController'
  });
});

// Controllers

app.controller('SearchController', function($scope, $http, $log) {
  $scope.searchURL = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=kdtj8y8bhmde6nb7s68ta325&callback=JSON_CALLBACK'
  $scope.isLoading = false;
  $scope.movies = null;

  $scope.searchOptions = {
    query: '',
    page: 1
  }

  $scope.nextPage = function() {
    $scope.searchOptions.page += 1;
    $scope.searchMovies($scope.searchOptions.page);
  }

  $scope.prevPage = function() {
    $scope.searchOptions.page -= 1;
    $scope.searchMovies($scope.searchOptions.page);
  }

  $scope.newSearch = function() {
    $scope.searchOptions.page = 1;
    $scope.searchMovies($scope.searchOptions.page);
  }

  $scope.searchMovies = function(page) {
    $scope.isLoading = true;
    $log.log('searching movies!');
    url = $scope.searchURL + '&q=' + escape($scope.searchOptions.query) + '&page=' + page
    $http.jsonp(url).success(function(data) {
      $scope.isLoading = false;
      $scope.movies = data.movies;
      $scope.total = data.total;
    });

  }

});




