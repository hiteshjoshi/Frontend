webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * App module
	 * @desc: Main application setup
	 */
	var app = angular.module('app', [
	  /** THIRD party modules **/
	  'mm.foundation',
	  'angular-parallax',
	  'permission',
	  'ngLodash',
	  'angularMoment',
	  'ngSanitize',
	  //'ui.select2',
	  //'ui.tinymce',
	  'angulartics', 
	  __webpack_require__(1),
	  /** core modules */
	  'app.core',
	  /** others modules */
	  'app.dashboard',
	  'app.homepage',

	]);

	/**
	 * load up our modules
	 */
	__webpack_require__(3);
	__webpack_require__(14);
	__webpack_require__(26);

	/**
	 * bootstrap our App
	 */
	angular.element(document).ready(function () {
	  angular.bootstrap(document, ['app']);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2)
	module.exports = 'angulartics.google.analytics'


/***/ },
/* 2 */
/***/ function(module, exports) {

	(function(window, angular, undefined) {'use strict';

	/**
	 * @ngdoc overview
	 * @name angulartics.google.analytics
	 * Enables analytics support for Google Analytics (http://google.com/analytics)
	 */
	angular.module('angulartics.google.analytics', ['angulartics'])
	.config(['$analyticsProvider', function ($analyticsProvider) {

	  // GA already supports buffered invocations so we don't need
	  // to wrap these inside angulartics.waitForVendorApi

	  $analyticsProvider.settings.pageTracking.trackRelativePath = true;

	  // Set the default settings for this module
	  $analyticsProvider.settings.ga = {
	    // array of additional account names (only works for analyticsjs)
	    additionalAccountNames: undefined,
	    userId: null
	  };

	  $analyticsProvider.registerPageTrack(function (path) {
	    if (window._gaq) {
	      _gaq.push(['_trackPageview', path]);
	      angular.forEach($analyticsProvider.settings.ga.additionalAccountNames, function (accountName){
	        _gaq.push([accountName + '._trackPageview', path]);
	      });
	    }
	    if (window.ga) {
	      if ($analyticsProvider.settings.ga.userId) {
	        ga('set', '&uid', $analyticsProvider.settings.ga.userId);
	      }
	      ga('send', 'pageview', path);
	      angular.forEach($analyticsProvider.settings.ga.additionalAccountNames, function (accountName){
	        ga(accountName +'.send', 'pageview', path);
	      });
	    }
	  });

	  /**
	   * Track Event in GA
	   * @name eventTrack
	   *
	   * @param {string} action Required 'action' (string) associated with the event
	   * @param {object} properties Comprised of the mandatory field 'category' (string) and optional  fields 'label' (string), 'value' (integer) and 'noninteraction' (boolean)
	   *
	   * @link https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
	   *
	   * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
	   */
	  $analyticsProvider.registerEventTrack(function (action, properties) {

	    // Google Analytics requires an Event Category
	    if (!properties || !properties.category) {
	      properties = properties || {};
	      properties.category = 'Event';
	    }
	    // GA requires that eventValue be an integer, see:
	    // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue
	    // https://github.com/luisfarzati/angulartics/issues/81
	    if (properties.value) {
	      var parsed = parseInt(properties.value, 10);
	      properties.value = isNaN(parsed) ? 0 : parsed;
	    }

	    if (window.ga) {

	      var eventOptions = {
	        eventCategory: properties.category,
	        eventAction: action,
	        eventLabel: properties.label,
	        eventValue: properties.value,
	        nonInteraction: properties.noninteraction,
	        page: properties.page || window.location.hash.substring(1) || window.location.pathname,
	        userId: $analyticsProvider.settings.ga.userId
	      };

	      // add custom dimensions and metrics
	      for(var idx = 1; idx<=20;idx++) {
	      if (properties['dimension' +idx.toString()]) {
	        eventOptions['dimension' +idx.toString()] = properties['dimension' +idx.toString()];
	      }
	      if (properties['metric' +idx.toString()]) {
	        eventOptions['metric' +idx.toString()] = properties['metric' +idx.toString()];
	        }
	      }
	      ga('send', 'event', eventOptions);
	      angular.forEach($analyticsProvider.settings.ga.additionalAccountNames, function (accountName){
	        ga(accountName +'.send', 'event', eventOptions);
	      });
	    }

	    else if (window._gaq) {
	      _gaq.push(['_trackEvent', properties.category, action, properties.label, properties.value, properties.noninteraction]);
	    }

	  });

	  $analyticsProvider.registerSetUsername(function (userId) {
	    $analyticsProvider.settings.ga.userId = userId;
	  });

	}]);
	})(window, window.angular);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Core module
	 * @desc:
	 */
	var appCore = angular.module('app.core', [
	  'ngCookies',
	  'ngAnimate',
	  'ngTouch',
	  'ui.router',
	  'base64'
	]);

	/** routes and run configs */
	__webpack_require__(5)(appCore);
	__webpack_require__(6)(appCore);

	/** controllers */
	__webpack_require__(7)(appCore);

	/** directives */
	__webpack_require__(8)(appCore);
	__webpack_require__(9)(appCore);
	__webpack_require__(4)(appCore);

	/** filters */
	__webpack_require__(10)(appCore);

	/** factories */
	__webpack_require__(11)(appCore);
	__webpack_require__(12)(appCore);
	__webpack_require__(13)(appCore);


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Slimscroll
	 * @module: app.core
	 * @desc: Application custom scrollbar
	 */
	module.exports = function (module) {
	  module.value('datetimepickerConfig', {});
	  module.directive('datetimepicker', ['$timeout', 'datetimepickerConfig','moment', function ($timeout, datetimepickerConfig,moment) {

	    Date.parseDate = function( input, format ){
	      return moment(input,format).toDate();
	    };
	    Date.prototype.dateFormat = function( format ){
	      return moment(this).format(format);
	    };

	    var options ={
	      inline:true,
	      minDate:0,
	      startDate:new Date(),
	      todayButton:true,
	      format:'DD.MM.YYYY h:mm a',
	      formatTime:'h:mm a',
	      formatDate:'DD.MM.YYYY'
	    };

	    if (datetimepickerConfig) { angular.extend(options, datetimepickerConfig); }

	    return {
	      restrict: 'A',
	      require: 'ngModel',
	      scope: {
	          ngModel: '=',
	          baseDate: '=',
	          dateTimepicker: '=',
	      },
	      link: function($scope, iElm, iAttrs,ngModel) {
	        $timeout(function () {

	          var opts = angular.extend({}, options);

	          angular.element(iElm).datetimepicker(
	            angular.extend(opts, ngModel.$modelValue?ngModel.$modelValue:{})
	          );
	        });
	      }
	    };
	  }]);
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Core run
	 * @module: app.core
	 */
	module.exports = function (module) {
	  module.run([
	    '$rootScope',
	    '$state',
	    '$stateParams',
	    '$http',
	    '$cookies',
	    'Permission',
	    'session',
	    function ($rootScope, $state, $stateParams,$http,$cookies,Permission,session) {

	        //Define anonymous role
	        Permission.defineRole('anonymous', function (stateParams) {
	            // If the returned value is *truthy* then the user has the role, otherwise they don't
	            return !session.exists();
	        });
	        
	        //Define admin role
	        Permission.defineRole('admin', function (stateParams) {
	            return session.is_admin;
	        });
	        
	        //Define user role
	        Permission.defineRole('user', function (stateParams) {
	            return session.exists();
	        });
	        
	        //For tokens and other requests.
	        $http.defaults.headers.common.Authorization = 'Bearer '+$cookies.c2cCookie;
	        //$http.defaults.withCredentials = true;
	        $rootScope.$state = $state;
	        $rootScope.$stateParams = $stateParams;
	        $rootScope.title = 'We care';
	    }
	  ]);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Core routes
	 * @module: app.core
	 */
	module.exports = function (module) {
	  module.config([
	    '$locationProvider',
	    '$urlRouterProvider',
	    '$stateProvider',
	    '$controllerProvider',
	    '$compileProvider',
	    '$filterProvider',
	    '$provide',
	    '$analyticsProvider',
	    'sessionProvider',

	    function ($locationProvider, $urlRouterProvider, $stateProvider, $controllerProvider, $compileProvider, $filterProvider, $provide,$analyticsProvider,session) {
	      /** store a reference to various provider functions */
	      module.controller = $controllerProvider.register;
	      module.directive  = $compileProvider.directive;
	      module.filter     = $filterProvider.register;
	      module.factory    = $provide.factory;
	      module.provider   = $provide.provider;
	      module.service    = $provide.service;
	      module.constant   = $provide.constant;
	      module.value      = $provide.value;
	      
	      // turn off automatic tracking
	      $analyticsProvider.virtualPageviews(false);

	      /** default route */
	      console.log(session.$get().exists(),session.$get().is_admin,session.$get().url);
	      $urlRouterProvider.otherwise(session.$get().url);

	      /** parent route */
	      $stateProvider
	      .state('default', {
	        abstract: true,
	        url: '',
	        templateUrl: 'modules/core/views/layouts/default.html'
	      })
	      .state('dashboard', {
	        abstract: true,
	        url: '',
	        templateUrl: 'modules/core/views/layouts/dashboard.html'
	      });


	    }
	  ]);
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Core setting controller
	 * @module: app.core 
	 */
	module.exports = function (module) {
	  module.controller('coreSettingsCtrl', [
	    '$scope',
	    '$rootScope',
	    '$window',
	    '$timeout',
	    '$cookies',
	    'viewport',
	    '$state',
	    'session',
	    '$urlRouter',    
	    function ($scope, $rootScope, $window, $timeout, $cookies, viewport,$state,session,$urlRouter) {
	      /** App Initial Settings */
	      $scope.core = {
	        name: 'ModerationPanel',
	        version: '0.0.1',
	        settings: {
	          fullScreen: false,
	          pageLoading: false,
	          headerFixed: true,
	          headerSearchForm: false,
	          sidebarLeftOpen: false,
	          sidebarLeftFixed: false,
	          sidebarLeftCollapse: viewport.width() >= 768 && viewport.width() < 992 ? true : false
	        },
	        screen: {
	          xs: viewport.width() < 768 ? true : false,
	          sm: viewport.width() >= 768 && viewport.width() < 992 ? true : false,
	          md: viewport.width() >= 992 && viewport.width() < 1200 ? true : false,
	          lg: viewport.width() >= 1200 ? true : false,
	          height: viewport.height(),
	          width: viewport.width()
	        }
	      };

	      /** hide sidebar and show loading indicator */
	      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
	        //console.log(toState.name, fromState.name);
	        // if(toState.name === fromState.name){
	        //   console.log('HELP');
	        //   return true;
	        // }

	        // $rootScope.title = 'Loading...';
	        
	        // var allowedState = session.allowedState;

	        // if(session.exists() === false){

	        //   if((allowedState.indexOf(toState.name) > -1)){//current state is allowed to be used;

	        //   }
	        //   else{
	        //     event.preventDefault();
	        //     $urlRouter.sync();
	            
	        //     $timeout(function(){
	        //       console.log(session.state,1);
	        //       $state.transitionTo(session.state,{},{
	        //         reload: true, inherit: false, notify: true
	        //       });

	        //     });
	        //   }  
	          
	        // }
	        // else{ // if session exists, dont let them go to allowed state
	        //   if((allowedState.indexOf(toState.name) > -1) && (toState.name !== fromState.name) ){//current state is allowed to be used;
	        //     event.preventDefault();
	        //     $urlRouter.sync();
	            
	        //     $timeout(function(){
	        //       console.log(session.state,2);
	        //       $state.transitionTo(session.state,{},{
	        //         reload: true, inherit: false, notify: true
	        //       });

	        //     });
	        //   }
	        // }

	        $scope.core.settings.sidebarLeftOpen = false;
	        $scope.core.settings.pageLoading = true;
	      });

	      /** show loading indicator */
	      $rootScope.$on('$stateChangeSuccess', function (event, current, previous) {
	        $scope.core.settings.pageLoading = false;
	        $rootScope.title = current.title;
	      });


	      /** On resize, update viewport variable */
	      angular.element($window).on('resize', function () {
	        $timeout.cancel($scope.resizing);

	        $scope.resizing = $timeout(function () {
	          $scope.core.screen.xs = viewport.width() < 768 ? true : false;
	          $scope.core.screen.sm = viewport.width() >= 768 && viewport.width() < 992 ? true : false;
	          $scope.core.screen.md = viewport.width() >= 992 && viewport.width() < 1200 ? true : false;
	          $scope.core.screen.lg = viewport.width() >= 1200 ? true : false;
	          $scope.core.screen.height = viewport.height();
	          $scope.core.screen.width = viewport.width();
	        }, 100);
	      });
	    }
	  ]);
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Page Loading indicator
	 * @module: app.core
	 * @desc: Application page loading indicator
	 */
	module.exports = function (module) {
	  module.directive('indicator', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
	    return {
	      restrict: 'A',
	      replace: true,
	      templateUrl: 'modules/core/views/partials/spinner.html',
	      link: function($scope, iElm, iAttrs) {
	        $timeout(function () {
	          var $wrapper = angular.element(iElm).parent('.spinner-wrapper'),
	              $spinner = angular.element(iElm);

	          /** show loading indicator */
	          $rootScope.$on('$stateChangeStart', function () {
	            $wrapper.addClass('show');
	          });

	          /** hide loading indicator */
	          $rootScope.$on('$stateChangeSuccess', function () {
	            $wrapper.removeClass('show');
	          });
	        });
	      }
	    };
	  }]);
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

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


	              
	              var bootMe = function(){

	                var w = 1000;
	                var h = 600;
	                var linkDistance=200;

	                var colors = $window.d3.scale.category20c();

	                var dataset = JSON.parse(attrs.json);

	                $window.d3.select(element[0]).select('svg').remove();
	                var svg = $window.d3.select(element[0]).append('svg').attr({'width':w,'height':h});

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


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Filters
	 * @module: app.core
	 * @desc: Capitalize wording
	 */
	module.exports = function (module) {
	  module.filter('capitalize', function () {
	    return function(input) {
	      return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
	        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	      }) : '';
	    };
	  });
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Viewport Services
	 * @module: app.core
	 * @desc: Calculate application window width and height
	 */
	module.exports = function (module) {
	  module.factory('viewport', ['$window', function ($window) {
	    return {
	      height: function() {
	        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	      },
	      width: function() {
	        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	      }
	    };
	  }]);
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Viewport Services
	 * @module: app.core
	 * @desc: Calculate application window width and height
	 */
	//
	module.exports = function (module) {
		module.factory('api', ['$rootScope','$http', function ($rootScope,$http) {
			//var parseUrl = 'http://localhost:8080';
			var parseUrl = 'http://api.askparrot.com';

			var parseHeaders = {}; //set Headers for JWTTOKEN


			var GenerateUrl = function(theClass,object,objectId){
				if(object && objectId){
					return parseUrl+ '/' + theClass + '/'+ object + '/' + objectId;
				}
				else{
					if(object){
						return parseUrl+ '/' + theClass + '/'+ object;
					}
					else{
						return parseUrl+ '/' + theClass;
					}
				}
			};

			return {
				//Create a db object on server
				post: function(theClass,object, data, callback) {

					$http.post(
						GenerateUrl(theClass,object,false),

						data,
						{ headers: parseHeaders }
					)
					.success(function(response) {


						callback(null,response);
					})
					.error(function(response) {

						callback(true,response || 'Cannot submit data!');
					});
				},
				put: function(theClass,object, objectId, data, callback) {

					$http.put(
						GenerateUrl(theClass,object,objectId),

						data,
						{ headers: parseHeaders }
					)
					.success(function(response) {

						callback(null,response);
					})
					.error(function(response) {

						callback(true,response || 'There is some problem with your data.');
					});
				},
				//Get a db object by id
				get: function(theClass,object, objectId, query,callback) {

					var config = { headers: parseHeaders };
					if (query){
						config.params = query;
					}
					$http.get(
						GenerateUrl(theClass,object,objectId),

						config
					).success(function(response) {

						callback(null,response);
					}).error(function(response) {

						callback(true,response || 'Some error occured.');
					});
				},
				//Remove a db object
				delete: function(theClass,object, objectId, callback) {

					$http['delete']( //['delete'] to get around using delete js keyword
						GenerateUrl(theClass,object,objectId),
						{ headers: parseHeaders }
					).success(function(response) {

						callback(null,response);
					}).error(function(response) {

						callback(true,response || 'Some error occured.');
					});
				}
			};
	  	}]);
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (module) {
		module.factory('session', ['$rootScope','api','$cookies','$base64','$state', function ($rootScope,api,$cookies,$base64,$state) {
			
			return {
				exists: function() {
					function urlBase64Decode(str) {
					      var output = str.replace('-', '+').replace('_', '/');
					      switch (output.length % 4) {
					          case 0:
					              break;
					          case 2:
					              output += '==';
					              break;
					          case 3:
					              output += '=';
					              break;
					          default:
					              throw 'Illegal base64url string!';
					      }
					      return $base64.decode(output);
					  }

					function getUserFromToken() {
					      var token = $cookies.c2cCookie;
					      var user = {};
					      if (typeof token !== 'undefined') {
					          var encoded = token.split('.')[1];
					          user = JSON.parse(urlBase64Decode(encoded));
					      }
					      else{
					        user = null;
					        user = false;
					      }
					      return user;
					  }

		          /*** check if a user is loggedIn ***/
			      $rootScope.user = getUserFromToken();
			      $rootScope.logout = function(){
			      	api.post('logout',false,false,function(){
			      		//$cookies.remove('c2cCookie');
			      		$rootScope.token = null;
			      		delete $cookies.c2cCookie;
			      		//window.location.reload();
			      		$state.go('default.homepage');
			      		window.location.reload();
			      	});
			      };
			      $rootScope.token = $cookies.c2cCookie;
			      if($rootScope.token && $rootScope.user){
			      	return true;
			      }
			      else{
			      	return false;
			      }
				},
				url : ($rootScope.token && $rootScope.user) ? 'dashboard':'/',
				is_admin : ($rootScope.token && $rootScope.user && $rootScope.user.is_admin) ? true:false,
				state : ($rootScope.token && $rootScope.user) ? 'dashboard.index':'default.homepage',
				allowedState:['default.homepage','default.login','default.signup','default.resources','default.faq','default.contact'],
				socket: function() {
					$rootScope.socket = null;

					return $rootScope.socket;
					
				}
			};
	  	}]);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Dashboard module
	 * @desc:
	 */
	var appDashboard = angular.module('app.dashboard', []);

	/** routes configs */
	__webpack_require__(15)(appDashboard);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Dashboard routes
	 * @module: app.dashboard
	 */
	module.exports = function (module) {
	  module.config([
	    '$locationProvider',
	    '$urlRouterProvider',
	    '$stateProvider',
	    '$controllerProvider',
	    '$compileProvider',
	    '$filterProvider',
	    '$provide',
	    function ($locationProvider, $urlRouterProvider, $stateProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
	      /** store a reference to various provider functions */
	      module.controller = $controllerProvider.register;
	      module.directive  = $compileProvider.directive;
	      module.filter     = $filterProvider.register;
	      module.factory    = $provide.factory;
	      module.provider   = $provide.provider;
	      module.service    = $provide.service;
	      module.constant   = $provide.constant;
	      module.value      = $provide.value;

	      /** setup routes */
	      $stateProvider.state('dashboard.index', {
	        url: '/dashboard',
	        templateUrl: 'modules/dashboard/views/dashboard.html',
	        data: {
	          permissions: {
	            only: ['user'],
	            redirectTo: 'default.login'
	          }
	        },
	        resolve: {
	          load: ['$q', '$rootScope', function ($q, $rootScope) {
	            var deferred = $q.defer();

	            __webpack_require__.e/* nsure */(1, function () {
	              /** Controllers */
	              __webpack_require__(16)(module);
	              __webpack_require__(17)(module);

	              deferred.resolve();
	            });

	            return deferred.promise;
	          }]
	        }
	      });


	      $stateProvider.state('dashboard.reminders', {
	        url: '/reminders',
	        templateUrl: 'modules/dashboard/views/reminders.html',
	        data: {
	          permissions: {
	            only: ['user'],
	            redirectTo: 'default.login'
	          }
	        },
	        resolve: {
	          load: ['$q', '$rootScope', function ($q, $rootScope) {
	            var deferred = $q.defer();

	            __webpack_require__.e/* nsure */(2, function () {

	              /** Controllers */
	              __webpack_require__(16)(module);
	              __webpack_require__(18)(module);
	              deferred.resolve();
	            });

	            return deferred.promise;
	          }]
	        }
	      });


	      $stateProvider.state('dashboard.members', {
	        url: '/members',
	        templateUrl: 'modules/dashboard/views/members.html',
	        data: {
	          permissions: {
	            only: ['user'],
	            redirectTo: 'default.login'
	          }
	        },
	        resolve: {
	          load: ['$q', '$rootScope', function ($q, $rootScope) {
	            var deferred = $q.defer();

	            __webpack_require__.e/* nsure */(3, function () {

	              /** Controllers */
	              __webpack_require__(16)(module);
	              __webpack_require__(19)(module);

	              deferred.resolve();
	            });

	            return deferred.promise;
	          }]
	        }
	      });

	      $stateProvider.state('dashboard.ecards', {
	        url: '/ecards',
	        templateUrl: 'modules/dashboard/views/ecards.html',
	        data: {
	          permissions: {
	            only: ['user'],
	            redirectTo: 'default.login'
	          }
	        },
	        resolve: {
	          load: ['$q', '$rootScope', function ($q, $rootScope) {
	            var deferred = $q.defer();

	            __webpack_require__.e/* nsure */(4, function () {

	              /** Controllers */
	              __webpack_require__(16)(module);
	              __webpack_require__(20)(module);

	              deferred.resolve();
	            });

	            return deferred.promise;
	          }]
	        }
	      });


	      $stateProvider.state('dashboard.history', {
	        url: '/history',
	        templateUrl: 'modules/dashboard/views/history.html',
	        data: {
	          permissions: {
	            only: ['user'],
	            redirectTo: 'default.login'
	          }
	        },
	        resolve: {
	          load: ['$q', '$rootScope', function ($q, $rootScope) {
	            var deferred = $q.defer();

	            __webpack_require__.e/* nsure */(5, function () {

	              /** Controllers */
	              __webpack_require__(16)(module);
	              __webpack_require__(21)(module);

	              deferred.resolve();
	            });

	            return deferred.promise;
	          }]
	        }
	      });


	      $stateProvider.state('dashboard.account', {
	        url: '/account',
	        templateUrl: 'modules/dashboard/views/account_settings.html',
	        data: {
	          permissions: {
	            only: ['user'],
	            redirectTo: 'default.login'
	          }
	        },
	        resolve: {
	          load: ['$q', '$rootScope', function ($q, $rootScope) {
	            var deferred = $q.defer();

	            __webpack_require__.e/* nsure */(6, function () {

	              /** Controllers */
	              __webpack_require__(16)(module);
	              __webpack_require__(22)(module);

	              deferred.resolve();
	            });

	            return deferred.promise;
	          }]
	        }
	      });

	      $stateProvider.state('dashboard.billing', {
	        url: '/billing',
	        templateUrl: 'modules/dashboard/views/billing_settings.html',
	        data: {
	          permissions: {
	            only: ['user'],
	            redirectTo: 'default.login'
	          }
	        },
	        resolve: {
	          load: ['$q', '$rootScope', function ($q, $rootScope) {
	            var deferred = $q.defer();

	            __webpack_require__.e/* nsure */(7, function () {

	              /** Controllers */
	              __webpack_require__(16)(module);
	              __webpack_require__(23)(module);

	              deferred.resolve();
	            });

	            return deferred.promise;
	          }]
	        }
	      });


	      $stateProvider.state('dashboard.admin_users', {
	        url: '/admin_users',
	        templateUrl: 'modules/dashboard/views/admin/users.html',
	        data: {
	          permissions: {
	            only: ['admin'],
	            redirectTo: 'default.login'
	          }
	        },
	        resolve: {
	          load: ['$q', '$rootScope', function ($q, $rootScope) {
	            var deferred = $q.defer();

	            __webpack_require__.e/* nsure */(8, function () {

	              /** Controllers */
	              __webpack_require__(24)(module);

	              deferred.resolve();
	            });

	            return deferred.promise;
	          }]
	        }
	      });



	      $stateProvider.state('dashboard.admin_plans', {
	        url: '/admin_plans',
	        templateUrl: 'modules/dashboard/views/admin/plans.html',
	        data: {
	          permissions: {
	            only: ['admin'],
	            redirectTo: 'default.login'
	          }
	        },
	        resolve: {
	          load: ['$q', '$rootScope', function ($q, $rootScope) {
	            var deferred = $q.defer();

	            __webpack_require__.e/* nsure */(8/* duplicate */, function () {

	              /** Controllers */
	              __webpack_require__(24)(module);

	              deferred.resolve();
	            });

	            return deferred.promise;
	          }]
	        }
	      });



	      $stateProvider.state('dashboard.admin_ecards', {
	        url: '/admin_ecards',
	        templateUrl: 'modules/dashboard/views/admin/ecards.html',
	        data: {
	          permissions: {
	            only: ['admin'],
	            redirectTo: 'default.login'
	          }
	        },
	        resolve: {
	          load: ['$q', '$rootScope', function ($q, $rootScope) {
	            var deferred = $q.defer();

	            __webpack_require__.e/* nsure */(8/* duplicate */, function () {

	              /** Controllers */
	              __webpack_require__(24)(module);

	              deferred.resolve();
	            });

	            return deferred.promise;
	          }]
	        }
	      });

	      $stateProvider.state('dashboard.admin_settings', {
	        url: '/admin_settings',
	        templateUrl: 'modules/dashboard/views/admin/settings.html',
	        data: {
	          permissions: {
	            only: ['admin'],
	            redirectTo: 'default.login'
	          }
	        },
	        resolve: {
	          load: ['$q', '$rootScope', function ($q, $rootScope) {
	            var deferred = $q.defer();

	            __webpack_require__.e/* nsure */(8/* duplicate */, function () {

	              /** Controllers */
	              __webpack_require__(24)(module);

	              deferred.resolve();
	            });

	            return deferred.promise;
	          }]
	        }
	      });





	      $stateProvider.state('dashboard.admin_index', {
	        url: '/admin_index',
	        templateUrl: 'modules/dashboard/views/admin/index.html',
	        data: {
	          permissions: {
	            only: ['admin'],
	            redirectTo: 'default.login'
	          }
	        },
	        resolve: {
	          load: ['$q', '$rootScope', function ($q, $rootScope) {
	            var deferred = $q.defer();

	            __webpack_require__.e/* nsure */(8/* duplicate */, function () {

	              /** Controllers */
	              __webpack_require__(24)(module);

	              deferred.resolve();
	            });

	            return deferred.promise;
	          }]
	        }
	      });


	      $stateProvider.state('dashboard.paypal', {
	        url: '/paypalConfirm',
	        templateUrl: 'modules/dashboard/views/paypal.html',
	        data: {
	          permissions: {
	            only: ['user'],
	            redirectTo: 'default.login'
	          }
	        },
	        resolve: {
	          load: ['$q', '$rootScope', function ($q, $rootScope) {
	            var deferred = $q.defer();

	            __webpack_require__.e/* nsure */(9, function () {

	              /** Controllers */
	              __webpack_require__(25)(module);

	              deferred.resolve();
	            });

	            return deferred.promise;
	          }]
	        }
	      });

	      $stateProvider.state('dashboard.paypal_cancel', {
	        url: '/paypalCancel',
	        templateUrl: 'modules/dashboard/views/paypal.html',
	        data: {
	          permissions: {
	            only: ['user'],
	            redirectTo: 'default.login'
	          }
	        },
	        resolve: {
	          load: ['$q', '$rootScope', function ($q, $rootScope) {
	            var deferred = $q.defer();

	            __webpack_require__.e/* nsure */(9/* duplicate */, function () {

	              /** Controllers */
	              __webpack_require__(25)(module);

	              deferred.resolve();
	            });

	            return deferred.promise;
	          }]
	        }
	      });








	    }
	  ]);
	};


/***/ },
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Dashboard module
	 * @desc:
	 */
	var appDashboard = angular.module('app.homepage', []);

	/** routes configs */
	__webpack_require__(27)(appDashboard);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * homepage routes
	 * @module: app.homepage
	 */
	module.exports = function (module) {
	  module.config([
	    '$locationProvider',
	    '$urlRouterProvider',
	    '$stateProvider',
	    '$controllerProvider',
	    '$compileProvider',
	    '$filterProvider',
	    '$provide',
	    function ($locationProvider, $urlRouterProvider, $stateProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
	      /** store a reference to various provider functions */
	      module.controller = $controllerProvider.register;
	      module.directive  = $compileProvider.directive;
	      module.filter     = $filterProvider.register;
	      module.factory    = $provide.factory;
	      module.provider   = $provide.provider;
	      module.service    = $provide.service;
	      module.constant   = $provide.constant;
	      module.value      = $provide.value;

	      /** setup routes */
	      $stateProvider.state('default.homepage', {
	        url: '/',
	        templateUrl: 'modules/homepage/views/home.html',
	        resolve: {
	          load: ['$q', '$rootScope', function ($q, $rootScope) {
	            var deferred = $q.defer();

	            __webpack_require__.e/* nsure */(10, function () {
	              
	              
	              __webpack_require__(28)(module);
	              __webpack_require__(29)(module);
	              __webpack_require__(30)(module);

	              deferred.resolve();
	            });

	            return deferred.promise;
	          }]
	        }
	      });
	      
	      $stateProvider.state('default.login', {
	        url: '/login',
	        templateUrl: 'modules/homepage/views/login.html',
	        data: {
	          permissions: {
	            only: ['anonymous'],
	            redirectTo: 'dashboard.index'
	          }
	        },
	        resolve: {
	          load: ['$q', '$rootScope', function ($q, $rootScope) {
	            var deferred = $q.defer();

	            __webpack_require__.e/* nsure */(11, function () {

	              /** Controllers */
	              __webpack_require__(29)(module);
	              
	              deferred.resolve();
	            });

	            return deferred.promise;
	          }]
	        }
	      });

	      $stateProvider.state('default.signup', {
	        url: '/signup',
	        templateUrl: 'modules/homepage/views/signup.html',
	        data: {
	          permissions: {
	            only: ['anonymous'],
	            redirectTo: 'dashboard.index'
	          }
	        },
	        resolve: {
	          load: ['$q', '$rootScope', function ($q, $rootScope) {
	            var deferred = $q.defer();

	            __webpack_require__.e/* nsure */(12, function () {
	                
	              /** Controllers */
	              __webpack_require__(30)(module);
	            
	              deferred.resolve();
	            });

	            return deferred.promise;
	          }]
	        }
	      });

	      
	      
	      
	            
	      
	    }
	  ]);
	};

/***/ }
]);