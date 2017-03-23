(function() {
  angular.module('ngApp', ['ngRoute']).controller('LayoutController', function($scope, $http, $route, $routeParams, $location) {
    $scope.templates = '';
    $http.get('./data/header.json').then(function(response) {
      return $scope.templates = response.data;
    });
    $scope.template = {
      'url': './views/idxmain.html'
    };
    $scope.templateLayout = function(tpldata) {
      $scope.template = tpldata;
      return console.log('tpldata', $scope.template);
    };
    $scope.footerLayout = function() {
      return 'footer.html';
    };
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    console.log("$scope.$route", $scope.$route);
    console.log("$scope.$location", $scope.$location);
    return console.log("$scope.$routeParams", $scope.$routeParams);
  }).config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('Book', {
        templateUrl: './views/book.html'
      }).when('/', {
        templateUrl: './views/idxmain.html'
      });
    }
  ]);

}).call(this);
