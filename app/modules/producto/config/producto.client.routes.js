'use strict';

// Setting up route
angular.module('producto').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('producto', {
        abstract: true,
        url: '/producto',
        templateUrl: 'modules/producto/views/_body.html',
        controller: 'VentaController'
      })
      .state('producto.home', {
        url: '/home',
        templateUrl: 'modules/producto/views/index.html',
        ncyBreadcrumb: {
          label: 'Index'
        }
      })
      .state('producto.app', {
        url: '/app',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      });
  }
]);
