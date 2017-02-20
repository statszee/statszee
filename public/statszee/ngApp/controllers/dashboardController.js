var statsServer = angular.module('statsServer');

statsServer.controller("dashboardController", function($scope, DashboardUI, Restangular) {
  $scope.ui              = DashboardUI
  $scope.ui.pageTitle    = "Dashboard";
  $scope.ui.pageSubtitle = "Explore your data!";

  Restangular.allUrl('metrics', "/api/metrics").getList().then(function(data) {
    $scope.metrics       = data
    $scope.metrics_group = _.chunk(data, 2)
  })
})
