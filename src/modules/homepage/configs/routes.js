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

            require.ensure([], function () {
              
              
              require('moduleDir/homepage/controllers/home')(module);
              require('moduleDir/homepage/controllers/login')(module);
              require('moduleDir/homepage/controllers/signup')(module);

              deferred.resolve();
            }, 'homepage');

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

            require.ensure([], function () {

              /** Controllers */
              require('moduleDir/homepage/controllers/login')(module);
              
              deferred.resolve();
            }, 'login');

            return deferred.promise;
          }]
        }
      });

      
      
      
            
      
    }
  ]);
};