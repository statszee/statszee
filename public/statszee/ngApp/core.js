var statsServer = angular.module('statsServer', ['ngRoute', 'restangular', "highcharts-ng"]);

// configure our routes
statsServer
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'statszee/ngApp/templates/views/dashboard.html',
        controller:  'dashboardController'
      })
      .when('/metrics', {
        templateUrl: 'statszee/ngApp/templates/views/metrics.html',
        controller:  'metricsController'
      })
      .when('/search/:query',{
        templateUrl: 'statszee/ngApp/templates/views/dashboard.html',
        controller:  'searchController'
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
  })




