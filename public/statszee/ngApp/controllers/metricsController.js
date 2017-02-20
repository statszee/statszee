var statsServer = angular.module('statsServer');

statsServer.controller("metricsController", function($scope,DashboardUI,Restangular) {
  $scope.ui = DashboardUI
  $scope.ui.pageTitle    = "Metrics";
  $scope.ui.pageSubtitle = "Collected data";

  Restangular.allUrl('metrics',"/api/metrics").getList().then(function(data) {
    $scope.metrics=data
  })
})
