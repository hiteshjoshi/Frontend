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
                  'value_area': 800
                }
              },
              'color': {
                'value': '#000000'
              },
              'shape': {
                'type': 'circle',
                'stroke': {
                  'width': 0,
                  'color': '#000000'
                },
                'polygon': {
                  'nb_sides': 5
                },
                'image': {
                  'src': 'img/github.svg',
                  'width': 100,
                  'height': 100
                }
              },
              'opacity': {
                'value': 0.5,
                'random': false,
                'anim': {
                  'enable': false,
                  'speed': 1,
                  'opacity_min': 0.1,
                  'sync': false
                }
              },
              'size': {
                'value': 3,
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
    });
};
