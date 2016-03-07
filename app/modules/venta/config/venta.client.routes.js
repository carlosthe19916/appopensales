'use strict';

// Setting up route
angular.module('venta').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('venta', {
        abstract: true,
        url: '/venta',
        templateUrl: 'modules/venta/views/_body.html',
        controller: 'VentaController'
      })
      .state('venta.home', {
        url: '/home',
        templateUrl: 'modules/venta/views/index.html',
        ncyBreadcrumb: {
          label: 'Index'
        }
      })
      .state('venta.app', {
        url: '/app',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      });
  }
]);
