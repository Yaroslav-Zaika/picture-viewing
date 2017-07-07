angular.module('app', ['ngRoute']).config(function ($routeProvider, $locationProvider) {
  
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html',
      controller: 'HomeController',
      controllerAs: 'HomeCtrl'
    })
    .when('/picture/:id', {
      templateUrl: 'templates/picture.html',
      controller: 'PictureController',
      controllerAs: 'PictureCtrl'
    })
    .when('/album/:id', {
      templateUrl: 'templates/album.html',
      controller: 'AlbumController',
      controllerAs: 'AlbumCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  
  $locationProvider.html5Mode(true);
});