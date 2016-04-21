'use strict';

// Setting up route
angular.module('rrhh').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/rrhh/app/trabajadores/trabajadores', '/rrhh/app/trabajadores/trabajadores/buscar');

    $stateProvider
      .state('rrhh', {
        abstract: true,
        url: '/rrhh',
        templateUrl: 'modules/rrhh/views/_body.html',
        controller: 'RrhhController'
      })
      .state('rrhh.home', {
        url: '/home',
        templateUrl: 'modules/rrhh/views/index.html',
        ncyBreadcrumb: {
          label: 'Index'
        }
      })
      .state('rrhh.app', {
        url: '/app',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })

      .state('rrhh.app.trabajador', {
        url: '/trabajadores',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state('rrhh.app.configuracion', {
        url: '/configuracion',
        template: '<div ui-view></div>',
        abstract: true
      })

      .state('rrhh.app.trabajador.trabajador', {
        url: '/trabajadores',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('rrhh.app.trabajador.trabajador.buscar', {
        url: '/buscar',
        templateUrl: 'modules/rrhh/views/trabajador/buscar.html',
        controller: 'Rrhh.Trabajador.BuscarController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Home'
        },
        data: {
          pageTitle: 'Trabajadores'
        }
      });

  }
]);
