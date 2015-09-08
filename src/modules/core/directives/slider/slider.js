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

  .directive('tree', function($window) {
      return {
        restrict: 'A',
            replace: true,
            template: '<div class="chart" id="OrganiseChart6"></div>',
        link: function(scope, element, attrs, fn) {

          /* ---- particles.js config ---- */

          var tree_structure = {
              chart: {
                  container: "#OrganiseChart6",
                  levelSeparation:    25,
                  siblingSeparation:  70,
                  subTeeSeparation:   70,
                  nodeAlign: "BOTTOM",
                  scrollbar: "fancy",
                  padding: 35,
                  node: { HTMLclass: "evolution-tree" },
                  connectors: {
                      type: "curve",
                      style: {
                          "stroke-width": 2,
                          "stroke-linecap": "round",
                          "stroke": "#ccc"
                      }
                  }
              },

              nodeStructure: {
                  text: { name: "LIFE" },
                  HTMLclass: "the-parent",
                  children: [
                      {
                          text: { name: "true bacteria" },
                          image: "img/truebacteria.png"
                      },
                      {
                          pseudo: true,
                          children: [
                              {
                                  text: { name: "archea bacteria" },
                                  image: "img/archaebacteria.png"
                              },
                              {
                                  text: { name: "EUKARYOTES" },
                                  HTMLclass: "the-parent",
                                  children: [
                                      {
                                          text: { name: "protocists" },
                                          image: "img/protoctis.png"
                                      },
                                      {
                                          pseudo: true,
                                          children: [
                                              {
                                                  text: { name: "PLANTS" },
                                                  HTMLclass: "the-parent",
                                                  children: [
                                                      {
                                                          pseudo: true,
                                                          children: [
                                                              {
                                                                  pseudo: true,
                                                                  children: [
                                                                      {
                                                                          pseudo: true,
                                                                          children: [
                                                                              {
                                                                                  text: { name: "flowering seed plants" },
                                                                                  image: "img/cvijece2.png"
                                                                              },
                                                                              {
                                                                                  text: { name: "non-flowering seed plants" },
                                                                                  image: "img/ne_cvijece.png"
                                                                              }
                                                                          ]
                                                                      },
                                                                      {
                                                                         text: { name: "ferns and fern allies" },
                                                                          image: "img/ferns.png"
                                                                      }
                                                                  ]
                                                              },
                                                              {
                                                                  text: { name: "mosses and allies" },
                                                                  image: "img/mosses.png"
                                                              }
                                                          ]
                                                      },
                                                      {
                                                          text: { name: "green algae" },
                                                          image: "img/greenalgae.png"
                                                      }
                                                  ]
                                              },
                                              {
                                                  pseudo: true,
                                                  children: [
                                                      {
                                                          text: { name: "fungi and lichens" },
                                                          image: "img/fungi.png"
                                                      },
                                                      {
                                                          text: { name: "ANIMALS" },
                                                          HTMLclass: "the-parent",
                                                          children: [
                                                              {
                                                                  text: { name: "sponges" },
                                                                  image: "img/spuzva.png"
                                                              },
                                                              {
                                                                  pseudo: true,
                                                                  children: [
                                                                      {
                                                                          text: { name: "cnidarians" },
                                                                          image: "img/cnidarians.png"
                                                                      },
                                                                      {
                                                                          pseudo: true,
                                                                          childrenDropLevel: 1,
                                                                          children: [
                                                                              {
                                                                                  pseudo: true,
                                                                                  children: [
                                                                                      {
                                                                                          text: { name: "echinoderms" },
                                                                                          image: "img/zvezda.png"
                                                                                      },
                                                                                      {
                                                                                          text: { name: "VERTEBRATES" },
                                                                                          HTMLclass: "the-parent",
                                                                                          children: [
                                                                                              {
                                                                                                  text: { name: "cartilaginous fish" },
                                                                                                  image: "img/cartilaginousfish.png"
                                                                                              },
                                                                                              {
                                                                                                  text: { name: "bony fish" },
                                                                                                  image: "img/bonyfish.png"
                                                                                              },
                                                                                              {
                                                                                                  text: { name: "TETRAPODS" },
                                                                                                  HTMLclass: "the-parent",
                                                                                                  children: [
                                                                                                      {
                                                                                                          text: { name: "amphibians" },
                                                                                                          image: "img/zaba.png"
                                                                                                      },
                                                                                                      {
                                                                                                          text: { name: "AMNIOTES" },
                                                                                                          HTMLclass: "the-parent",
                                                                                                          children: [
                                                                                                              {
                                                                                                                  pseudo: true,
                                                                                                                  children: [
                                                                                                                      {
                                                                                                                          text: { name: "turtles" },
                                                                                                                          image: "img/kornjaca.png"
                                                                                                                      },
                                                                                                                      {
                                                                                                                          pseudo: true,
                                                                                                                          children: [
                                                                                                                              {
                                                                                                                                  text: { name: "snakes and lizards" },
                                                                                                                                  image: "img/zmijurina.png"
                                                                                                                              },
                                                                                                                              {
                                                                                                                                  text: { name: "crocodiles and birds" },
                                                                                                                                  image: "img/ptica.png"
                                                                                                                              }
                                                                                                                          ]
                                                                                                                      }
                                                                                                                  ]
                                                                                                              },
                                                                                                              {
                                                                                                                  text: { name: "mammals" },
                                                                                                                  image: "img/slon.png"
                                                                                                              }
                                                                                                          ]
                                                                                                      }
                                                                                                  ]
                                                                                              }
                                                                                          ]
                                                                                      }
                                                                                  ]
                                                                              },
                                                                              {
                                                                                  text: { name: "ARTHROPODS" },                                                                      
                                                                                  HTMLclass: "the-parent",
                                                                                  children: [
                                                                                      {
                                                                                          text: { name: "chelicerates" },
                                                                                          image: "img/chelirates.png"
                                                                                      },
                                                                                      {
                                                                                          pseudo: true,
                                                                                          stackChildren: true,
                                                                                          children: [
                                                                                              {
                                                                                                  text: { name: "crustaceans" },
                                                                                                  image: "img/rak.png"
                                                                                              },
                                                                                              {
                                                                                                  text: { name: "insects and myriapods" },
                                                                                                  image: "img/insekti.png"
                                                                                              }
                                                                                          ]
                                                                                      }
                                                                                  ]
                                                                              },
                                                                              {
                                                                                  pseudo: true,
                                                                                  children: [
                                                                                      {
                                                                                          text: { name: "flatworms" },
                                                                                          image: "img/flatare.png"
                                                                                      },
                                                                                      {
                                                                                          text: { name: "lophophorates" },
                                                                                          image: "img/lophoprates.png"
                                                                                      }

                                                                                  ]
                                                                              },
                                                                              {
                                                                                  pseudo: true,
                                                                                  childrenDropLevel: 1,
                                                                                  stackChildren: true,
                                                                                  children: [
                                                                                      {
                                                                                          text: { name: "rotifers" },
                                                                                          image: "img/rotfiers.png"
                                                                                      },
                                                                                      {
                                                                                          text: { name: "roundworms" },
                                                                                          image: "img/roundworms.png"
                                                                                      }
                                                                                  ]
                                                                              },
                                                                              {
                                                                                  pseudo: true,
                                                                                  childrenDropLevel: 1,
                                                                                  stackChildren: true,
                                                                                  children: [
                                                                                      {
                                                                                          text: { name: "mollusks" },
                                                                                          image: "img/mosculs.png"
                                                                                      },
                                                                                      {
                                                                                          text: { name: "segmented worms" },
                                                                                          image: "img/segmentedworms.png"
                                                                                      }
                                                                                  ]
                                                                              }
                                                                          ]
                                                                      }
                                                                  ]
                                                              }
                                                          ]
                                                      }
                                                  ]
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ]
                      }
                  ]
              }
          };

          $window.Treant( tree_structure );

        }
      };
    });
  
};
