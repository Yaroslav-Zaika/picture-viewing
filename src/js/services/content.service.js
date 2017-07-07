angular.module('app').factory('ContentService', function ($http) {
  
  var apiEndpoint = 'http://jsonplaceholder.typicode.com/';
  var methods = {};
  
  methods.getAllPictures = function () {
    return $http.get(apiEndpoint + 'photos');
  };
  
  methods.getAlbum = function (album_id) {
    return $http.get(apiEndpoint + 'albums/' + album_id + '/photos');
  };
  
  methods.getPicture = function (photo_id) {
    return $http.get(apiEndpoint + 'photos/' + photo_id);
  };
  
  return {
    getAllPictures: methods.getAllPictures,
    getAlbum: methods.getAlbum,
    getPicture: methods.getPicture
  };
});