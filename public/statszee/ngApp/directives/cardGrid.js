var statsServer = angular.module('statsServer');

statsServer.directive("cardGrid", function($timeout) {
  return {
    scope:       {
      array:     "=",
      colNumber: "="
    },
    restrict:    "E",
    templateUrl: "statszee/ngApp/templates/directive/card-grid.html",
    link:        {
      pre:  function(scope, element, attribute) {
        scope.$watch("array", function(oldValue, newValue) {
          scope.grid = _.chunk(scope.array, scope.colNumber)
        })
      },
      post: function(scope, element, attribute) {
        /*
        Block animation (to fix)
        $timeout(function() {
          var speed = 2000
          var delay = 0
          angular.element('.graph-card').each(function() {
            var elementOffset = angular.element(this).offset();
            var offset        = elementOffset.left * 0.8 + elementOffset.top;
            var delay         = (parseFloat(offset / speed) - 0.3).toFixed(2);
            angular.element(this)
              .css("-webkit-animation-delay", delay + 's')
              .css("-o-animation-delay", delay + 's')
              .css("animation-delay", delay + 's');
            angular.element(this).addClass('animated');
          });
        }, 50)
        */
      }
    }
  }
})
