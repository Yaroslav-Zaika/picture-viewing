angular.module('app').controller('PictureController', function ($routeParams, ContentService) {
  
  var self = this;
  
  ContentService.getPicture($routeParams.id).then(function (response) {
    self.picture = response.data;
  });
});