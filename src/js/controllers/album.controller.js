angular.module('app').controller('AlbumController', function ($routeParams, ContentService) {
  
  var self = this;
  
  ContentService.getAlbum($routeParams.id).then(function (response) {
    self.pictures = response.data;
  });
});