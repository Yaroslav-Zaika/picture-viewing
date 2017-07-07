angular.module('app').directive('scrollDirective', function ($window, $timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      
      var scrollDelay = 350;
      var throttled = false;
      
      angular.element($window).bind('scroll', function () {
        
        if (this.pageYOffset + this.outerHeight >= element[0].scrollHeight - this.outerHeight) {
          if (!throttled) {
            
            throttled = true;
            scope.$apply(attrs.scrollDirective);
            
            $timeout(function (){
              throttled = false;
            }, scrollDelay);
          }
        }
      });
    }
  }
});