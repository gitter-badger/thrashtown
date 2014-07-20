'use strict';

angular.module('hackathonApp').
  directive('pieChart', function ($parse) {
    return {
      restrict: 'E',
      scope: {data: '=chartData'},
      link: function (scope, element, attrs) {
        // var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

        var width = 960,
            height = 500;

        var svg = d3.select(element[0]).append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(32,' + (height / 2) + ')');

        var update = function(data) {

          // DATA JOIN
          // Join new data with old elements, if any.
          var text = svg.selectAll('text')
            .data(data, function(d) { return d; });

          // UPDATE
          // Update old elements as needed.
          text.attr('class', 'update')
            .transition()
              .duration(750)
              .attr('x', function(d, i) { return i * 32; });

          // ENTER
          // Create new elements as needed.
          text.enter()
            .append('text')
              .attr('class', 'enter')
              .attr('dy', '.35em')
              .attr('y', -60)
              .attr('x', function(d, i) { return i * 32; })
              .style('fill-opacity', 1e-6)
              .text(function(d) { return d; })
            .transition()
              .duration(750)
              .attr('y', 0)
              .style('fill-opacity', 1);

          // EXIT
          // Remove old elements as needed.
          text.exit()
              .attr('class', 'exit')
            .transition()
              .duration(750)
              .attr('y', 60)
              .style('fill-opacity', 1e-6)
              .remove();
        };

        // The initial display.
        // update(scope.data);

        // Update when data bound to chart-data attribute changes.
        scope.$watch('data', function(newVal) {
          update(newVal);
        });

      }
    };
  });