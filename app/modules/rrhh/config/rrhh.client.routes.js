'use strict';

// Setting up route
angular.module('rrhh').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/rrhh/app/trabajadores/trabajadores', '/rrhh/app/trabajadores/trabajadores/buscar');

    $urlRouterProvider.when('/rrhh/app/trabajadores/trabajadores/editar/:trabajador', '/rrhh/app/trabajadores/trabajadores/editar/:trabajador/resumen');

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
      })
      .state('rrhh.app.trabajador.trabajador.crear', {
        url: '/crear',
        templateUrl: 'modules/rrhh/views/trabajador/crear.html',
        controller: 'Rrhh.Trabajador.CrearController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Crear trabajador'
        },
        data: {
          pageTitle: 'Crear trabajador'
        }
      })
      .state('rrhh.app.trabajador.trabajador.editar', {
        url: '/editar/:trabajador',
        templateUrl: 'modules/rrhh/views/trabajador/editar.html',
        resolve: {
          trabajador: function ($state, $stateParams, OSTrabajador) {
            return OSTrabajador.$find($stateParams.trabajador);
          }
        },
        controller: 'Rrhh.Trabajador.EditarController',
        ncyBreadcrumb: {
          label: 'Editar trabajador',
          parent: 'rrhh.app.trabajador.trabajador.buscar'
        },
        data: {
          pageTitle: 'Editar trabajador'
        }
      })
      .state('rrhh.app.trabajador.trabajador.editar.resumen', {
        url: '/resumen',
        templateUrl: 'modules/rrhh/views/trabajador/editar.resumen.html',
        controller: 'Rrhh.Trabajador.Editar.ResumenController',
        resolve: {},
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('rrhh.app.trabajador.trabajador.editar.datosPrincipales', {
        url: '/datosPrincipales',
        templateUrl: 'modules/rrhh/views/trabajador/editar.datosPrincipales.html',
        controller: 'Rrhh.Trabajador.Editar.DatosPrincipalesController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Datos principales'
        }
      })
      .state('rrhh.app.trabajador.trabajador.editar.cajas', {
        url: '/cajas',
        templateUrl: 'modules/rrhh/views/trabajador/editar.cajas.html',
        controller: 'Rrhh.Trabajador.Editar.CajasController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Cajas asignadas'
        }
      });

  }
]);
