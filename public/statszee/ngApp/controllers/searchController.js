var statsServer = angular.module('statsServer');

statsServer.controller("searchController", function($scope, DashboardUI, Restangular, $routeParams) {
  $scope.query           = $routeParams.query;
  $scope.ui              = DashboardUI
  $scope.ui.pageTitle    = "Search result";
  $scope.ui.pageSubtitle = "Browsing result for: " + $scope.query;

  Restangular.allUrl('metrics', "/api/metrics?query=" + $scope.query).getList().then(function(data) {
    $scope.metrics = data
  })
})
