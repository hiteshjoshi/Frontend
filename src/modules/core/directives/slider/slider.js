'use strict';

/**
 * Page Loading indicator
 * @module: app.core
 * @desc: Application page loading indicator
 */
module.exports = function (module) {
  module
  // .directive('particle', ['$timeout', function ($timeout) {
  //   return {
  //     restrict: 'A',
  //     link: function($scope, iElm, iAttrs) {
  //       $timeout(function () {
  //         // jQuery(document).foundation(function(){});
          
          
  //         /* ---- particles.js config ---- */
  //       });
  //     }
  //   };
  // }])

  .directive('particles', function($window) {
      return {
        restrict: 'A',
            replace: true,
            template: '<div class="particleJs" id="particleJs"></div>',
        link: function(scope, element, attrs, fn) {

          /* ---- particles.js config ---- */

          $window.particlesJS('particleJs', {
            'particles': {
              'number': {
                'value': 100,
                'density': {
                  'enable': true,
                  'value_area': 700
                }
              },
              'color': {
                'value': '#6d6d6d'
              },
              'shape': {
                'type': 'circle',
                'stroke': {
                  'width': 0,
                  'color': '#2d2d2d'
                },
                'polygon': {
                  'nb_sides': 6
                },
                'image': {
                  'src': 'img/github.svg',
                  'width': 100,
                  'height': 100
                }
              },
              'opacity': {
                'value': 0.9,
                'random': false,
                'anim': {
                  'enable': false,
                  'speed': 1,
                  'opacity_min': 0.5,
                  'sync': false
                }
              },
              'size': {
                'value': 4,
                'random': true,
                'anim': {
                  'enable': false,
                  'speed': 40,
                  'size_min': 0.1,
                  'sync': false
                }
              },
              'line_linked': {
                'enable': true,
                'distance': 150,
                'color': '#000000',
                'opacity': 0.4,
                'width': 1
              },
              'move': {
                'enable': true,
                'speed': 6,
                'direction': 'none',
                'random': false,
                'straight': false,
                'out_mode': 'out',
                'bounce': false,
                'attract': {
                  'enable': false,
                  'rotateX': 600,
                  'rotateY': 1200
                }
              }
            },
            'interactivity': {
              'detect_on': 'canvas',
              'events': {
                'onhover': {
                  'enable': true,
                  'mode': 'grab'
                },
                'onclick': {
                  'enable': true,
                  'mode': 'push'
                },
                'resize': true
              },
              'modes': {
                'grab': {
                  'particles_nb': 4,
                  'distance': 140,
                  'line_linked': {
                    'opacity': 1
                  }
                },
                'bubble': {
                  'distance': 400,
                  'size': 40,
                  'duration': 2,
                  'opacity': 8,
                  'speed': 3
                },
                'repulse': {
                  'distance': 200,
                  'duration': 0.4
                },
                'push': {
                  'particles_nb': 4
                },
                'remove': {
                  'particles_nb': 2
                }
              }
            },
            'retina_detect': true
          });


                // $window.particlesJS('particleJs', {
                //     particles: {
                //         color: '#52a5fd',
                //         shape: 'circle',
                //         opacity: 1,
                //         size: 5.5,
                //         size_random: true,
                //         nb: 20,
                //         line_linked: {
                //             enable_auto: true,
                //             distance: 750,
                //             color: '#52a5fd',
                //             opacity: 0.5,
                //             width: 2,
                //             condensed_mode: {
                //                 enable: false,
                //                 rotateX: 600,
                //                 rotateY: 600
                //             }
                //         },
                //         anim: {
                //             enable: true,
                //             speed: 2.5
                //         }
                //     },
                //     interactivity: {
                //         enable: true,
                //         mouse: {
                //             distance: 250
                //         },
                //         detect_on: 'canvas',
                //         mode: 'grab',
                //         line_linked: {
                //             opacity: 0.5
                //         },
                //         events: {
                //             onclick: {
                //                 push_particles: {
                //                     enable: true,
                //                     nb: 4
                //                 }
                //             }
                //         }
                //     },
                //     retina_detect: true
                // });

        }
      };
    })

  .directive('tree', function($window,$parse) {
      return {

            restrict: 'A',
            replace: true,
            template: '<div class="chart" id="OrganiseChart6"></div>',
            link: function(scope, element, attrs, fn) {

              
              var json = $parse(attrs.json);

              
                var start_rendering = function(theValue){

                  var margin = {top: 0, right: 320, bottom: 0, left: 0},
                    width = 960 - margin.left - margin.right,
                    height = 500 - margin.top - margin.bottom;

                  var tree = d3.layout.tree()
                      .separation(function(a, b) { return a.parent === b.parent ? 1 : .5; })
                      .children(function(d) { return d.parents; })
                      .size([height, width]);

                  jQuery(element).html('');
                  var svg = d3.select("#OrganiseChart6").append("svg")
                      .attr("width", width + margin.left + margin.right)
                      .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                  var nodes = tree.nodes(theValue);

                  var link = svg.selectAll(".link")
                      .data(tree.links(nodes))
                    .enter().append("path")
                      .attr("class", "link")
                      .attr("d", elbow);

                  var node = svg.selectAll(".node")
                      .data(nodes)
                    .enter().append("g")
                      .attr("class", "node")
                      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

                  node.append("text")
                      .attr("class", "name")
                      .attr("x", 8)
                      .attr("y", -6)
                      .text(function(d) { return d.name; });

                  node.append("text")
                      .attr("x", 8)
                      .attr("y", 8)
                      .attr("dy", ".71em")
                      .attr("class", "about lifespan")
                      .text(function(d) { return d.born + "–" + d.died; });

                  node.append("text")
                      .attr("x", 8)
                      .attr("y", 8)
                      .attr("dy", "1.86em")
                      .attr("class", "about location")
                      .text(function(d) { return d.location; });
                }
                


                scope.$watchCollection(json, function(newValue, oldValue) {
                  console.log(oldValue,newValue);
                    //if (newValue !== oldValue) {
                      // You actions here
                      start_rendering(newValue);
                      //console.log("I got the new value! ", newValue);
                    //}
                });

              function elbow(d, i) {
                return "M" + d.source.y + "," + d.source.x
                     + "H" + d.target.y + "V" + d.target.x
                     + (d.target.children ? "" : "h" + margin.right);
              }

        }
      };
    });
  
};
