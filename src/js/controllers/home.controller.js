angular.module('app').controller('HomeController', function (ContentService) {
  
  var self = this;
  self.limit = 20;
  
  ContentService.getAllPictures().then(function (response) {
    self.pictures = response.data;
  });
  
  self.loadMore = function () {
    self.limit += 20; 
  };
});