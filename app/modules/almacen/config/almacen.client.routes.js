'use strict';

// Setting up route
angular.module('almacen').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('almacen', {
        abstract: true,
        url: '/almacen',
        templateUrl: 'modules/almacen/views/_body.html',
        controller: 'AlmacenController'
      })
      .state('almacen.home', {
        url: '/home',
        templateUrl: 'modules/almacen/views/index.html',
        ncyBreadcrumb: {
          label: 'Index'
        }
      })
      .state('almacen.app', {
        url: '/app',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      });
  }
]);
