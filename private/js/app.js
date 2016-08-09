var marvel = angular.module('marvel', ['ngRoute']);

marvel.config(function($routeProvider){
  $routeProvider
  .when('/', {
    controller: 'homeController',
    templateUrl: 'partials/homepage.html'
  })
  .when('/:offset', {
    controller: 'homeController',
    templateUrl: 'partials/homepage.html'
  })
  .when('/hero/:id', {
    controller: 'heroController',
    templateUrl: 'partials/single.html'
  })
})
