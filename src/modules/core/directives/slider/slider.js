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
            template: '<div class=\'particleJs\' id=\'particleJs\'></div>',
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
            link: function(scope, element, attrs, fn) {

              var i =0;
              
              var bootMe = function(){

                i++;

                var w = 1000;
                var h = 600;
                var linkDistance=200;

                var colors = $window.d3.scale.category20c();

                var dataset = JSON.parse(attrs.json);
                if(!dataset)
                  return;

                //$window.d3.select(element[0]).select('svg').remove();
                var svg = $window.d3.select(element[0]).append('svg:svg').attr("id","myID"+i).attr({'width':w,'height':h});

                var force = $window.d3.layout.force()
                    .nodes(dataset.nodes)
                    .links(dataset.edges)
                    .size([w,h])
                    .linkDistance([linkDistance])
                    .charge([-500])
                    .theta(0.5)
                    .gravity(0.05)
                    .start();

             

                var edges = svg.selectAll('line')
                  .data(dataset.edges)
                  .enter()
                  .append('line')
                  .attr('id',function(d,i) {return 'edge'+i;})
                  .attr('marker-end','url(#arrowhead)')
                  .style('stroke','#ccc')
                  .style('pointer-events', 'none');
                
                var nodes = svg.selectAll('circle')
                  .data(dataset.nodes)
                  .enter()
                  .append('circle')
                  .attr({'r':25})
                  .style('fill',function(d,i){return colors(i);})
                  .call(force.drag);


                var nodelabels = svg.selectAll('.nodelabel') 
                   .data(dataset.nodes)
                   .enter()
                   .append('text')
                   .attr({'x':function(d){return d.x;},
                          'y':function(d){return d.y;},
                          'class':'nodelabel',
                          'stroke':'black'})
                   .text(function(d){return d.name;});

                var edgepaths = svg.selectAll('.edgepath')
                    .data(dataset.edges)
                    .enter()
                    .append('path')
                    .attr({'d': function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;},
                           'class':'edgepath',
                           'fill-opacity':0,
                           'stroke-opacity':0,
                           'fill':'blue',
                           'stroke':'red',
                           'id':function(d,i) {return 'edgepath'+i;}})
                    .style('pointer-events', 'none');

                var edgelabels = svg.selectAll('.edgelabel')
                    .data(dataset.edges)
                    .enter()
                    .append('text')
                    .style('pointer-events', 'none')
                    .attr({'class':'edgelabel',
                           'id':function(d,i){return 'edgelabel'+i;},
                           'dx':80,
                           'dy':0,
                           'font-size':10,
                           'fill':'#aaa'});

                edgelabels.append('textPath')
                    .attr('xlink:href',function(d,i) {return '#edgepath'+i;})
                    .style('pointer-events', 'none')
                    .text(function(d,i){return d.type;});


                svg.append('defs').append('marker')
                    .attr({'id':'arrowhead',
                           'viewBox':'-0 -5 10 10',
                           'refX':25,
                           'refY':0,
                           //'markerUnits':'strokeWidth',
                           'orient':'auto',
                           'markerWidth':10,
                           'markerHeight':10,
                           'xoverflow':'visible'})
                    .append('svg:path')
                        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
                        .attr('fill', '#ccc')
                        .attr('stroke','#ccc');
                 

                force.on('tick', function(){

                    edges.attr({'x1': function(d){return d.source.x;},
                                'y1': function(d){return d.source.y;},
                                'x2': function(d){return d.target.x;},
                                'y2': function(d){return d.target.y;}
                    });

                    nodes.attr({'cx':function(d){return d.x;},
                                'cy':function(d){return d.y;}
                    });

                    nodelabels.attr('x', function(d) { return d.x; }) 
                              .attr('y', function(d) { return d.y; });

                    edgepaths.attr('d', function(d) { var path='M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;
                                                       //console.log(d)
                                                       return path;});       

                    edgelabels.attr('transform',function(d,i){
                        if (d.target.x<d.source.x){
                            var bbox = this.getBBox();
                            var rx = bbox.x+bbox.width/2;
                            var ry = bbox.y+bbox.height/2;
                            return 'rotate(180 '+rx+' '+ry+')';
                            }
                        else {
                            return 'rotate(0)';
                            }
                    });
                });
              };

              bootMe();
              
              scope.$watch(attrs.json,function(n,o){
                bootMe();
              });
              

        }
      };
    });
  
};
