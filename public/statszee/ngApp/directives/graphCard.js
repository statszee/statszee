var statsServer = angular.module('statsServer');

statsServer.directive("graphCard", function($http) {
  return {
    scope:       {
      metric: "="
    },
    restrict:    "E",
    templateUrl: "statszee/ngApp/templates/directive/graph-card.html",
    link:        {
      pre:  function(scope, element, attribute) {
        // TODO: Create a factory for this defaults
        scope.chartConfig = {
          title:       {
            text: ""
          },
          chart:       {
            zoomType:      'x',
            // Edit chart spacing
            spacingBottom: 15,
            spacingTop:    10,
            spacingLeft:   10,
            spacingRight:  10,

            // Explicitly tell the width and height of a chart
            width:  null,
            height: null
          },
          xAxis:       {
            type: 'datetime'
          },
          yAxis:       {
            title: {
              text: 'Value'
            }
          },
          plotOptions: {
            spline: {
              marker: {
                enabled: false
              }
            }
          },
          legend:      {
            enabled: true
          },
          series:      [
            {
              type:  "spline",
              data:  [],
              name:  "Count",
              id:    scope.metric.namespace + "-count",
              color: "#F44336"
            },
            {
              type:  "spline",
              data:  [],
              name:  "Sum",
              id:    scope.metric.namespace + "-sum",
              color: "#009688"
            },
            {
              type:  "spline",
              data:  [],
              name:  "Min",
              id:    scope.metric.namespace + "-min",
              color: "#2196F3"
            },
            {
              type:  "spline",
              data:  [],
              name:  "Max",
              id:    scope.metric.namespace + "-max",
              color: "#4CAF50"
            },
            {
              type:  "spline",
              data:  [],
              name:  "Avg",
              id:    scope.metric.namespace + "-avg",
              color: "#FF9800"
            }
          ]
        }
      },
      post: function(scope, element, attribute) {
        scope.updateGraph = function() {
          $http.get("/api/read/" + scope.metric.namespace + "/" + scope.metric.precision)
            .then(function(response) {
              response.data.forEach(function(data) {
                scope.chartConfig.series[0].data.push([data[0], data[1]]);
                scope.chartConfig.series[1].data.push([data[0], data[2]]);
                scope.chartConfig.series[2].data.push([data[0], data[3]]);
                scope.chartConfig.series[3].data.push([data[0], data[4]]);
                scope.chartConfig.series[4].data.push([data[0], data[5]]);
              })
            })
            .catch(function(data) {
              // TODO: Disable graph and show alert
              scope.chartConfig.series[1].data = [];
              scope.chartConfig.series[2].data = [];
              scope.chartConfig.series[3].data = [];
              scope.chartConfig.series[4].data = [];
              scope.chartConfig.series[5].data = [];
            })
        }
        scope.$watch("metric", function(newValue, oldValue) {
          scope.updateGraph()
        })
        // TODO: Refresh interval from 1s to 5m
      }
    }
  }
})
