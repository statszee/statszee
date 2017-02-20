var statsServer = angular.module('statsServer');

statsServer.controller("mainController", function($scope, DashboardUI, $location) {
  $scope.ui = DashboardUI

  $scope.$watch("searchInput", function(newValue, oldValue) {
    if (newValue && newValue.length > 2) {
      $location.path("/search/" + newValue)
    }
  })

})
