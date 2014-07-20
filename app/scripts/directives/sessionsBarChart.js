'use strict';

angular.module('hackathonApp').
  directive('sessionsBarChart', function () {
    return {
      restrict: 'E',
      scope: {data: '=chartData'},
      link: function (scope, element, attrs) {

        var margin = {top: 20, right: 20, bottom: 70, left: 40},
            width = 600 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        // Parse the date / time
        // var parseDate = d3.time.format('%Y-%m').parse;

        var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

        var y = d3.scale.linear().range([height, 0]);

        var svg = d3.select(element[0]).append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
          .append('g')
            .attr('transform', 
                  'translate(' + margin.left + ',' + margin.top + ')');

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .tickFormat(d3.time.format('%Y-%m'));

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(5)
            .tickFormat(d3.format('d'));

        var xAxisG = svg
          .append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')');

        var yAxisG = svg.append('g')
            .attr('class', 'y axis');

        var update = function(data) {

          data.forEach(function(d) {
              d.date = new Date(d.date);
          });

          x.domain(data.map(function(d) { return d.date; }));
          y.domain([0, d3.max(data, function(d) { return d.total; })]);

          // AXES
          // UPDATE
          // Only using update for axis, never adding or removing
          xAxisG.call(xAxis)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.7em')
            .attr('dy', '.20em')
            .attr('transform', 'rotate(-45)' );

          yAxisG.call(yAxis);

          // BARS
          // DATA JOIN
          var bars = svg.selectAll('rect')
            .data(data);

          // UPDATE 
          bars
            .attr('x', function(d) { return x(d.date); })
            .attr('width', x.rangeBand())
            .attr('y', function(d) { return y(d.total); })
            .attr('height', function(d) { return height - y(d.total); })
            ;

          // ENTER
          bars
            .enter()
              .append('rect')
              .style('fill', 'steelblue')
              .attr('x', function(d) { return x(d.date); })
              .attr('width', x.rangeBand())
              .attr('y', function(d) { return y(d.total); })
              .attr('height', function(d) { return height - y(d.total); })
              ;


          // EXIT
          bars
            .exit()
            .remove();
              // .transition()
              // .duration(1000)
              //   .attr('y', function(d) { return y(0); })
              //   .attr('height', 0)
              //   .remove();
        };

        // Update when data bound to chart-data attribute changes.
        scope.$watch('data', function(newVal) {
          update(newVal);
        });

      }
    };
  });