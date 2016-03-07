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
      })

      .state('venta.app.caja', {
        url: '/caja',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state('venta.app.operaciones', {
        url: '/operaciones',
        template: '<div ui-view></div>',
        abstract: true
      })

      .state('venta.app.caja.abrir', {
        url: '/abrir',
        templateUrl: 'modules/venta/views/caja/caja.abrir.html',
        controller: 'Venta.Caja.AbrirController',
        resolve: {

        },
        ncyBreadcrumb: {
          skip: true
        }
      })
      .state('venta.app.caja.cerrar', {
        url: '/cerrar',
        templateUrl: 'modules/venta/views/caja/caja.cerrar.html',
        controller: 'Venta.Caja.CerrarController',
        resolve: {

        },
        ncyBreadcrumb: {
          skip: true
        }
      })
      .state('venta.app.caja.movimientos', {
        url: '/movimientos',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('venta.app.caja.movimientos.buscar', {
        url: '/buscar',
        templateUrl: 'modules/venta/views/caja/caja.movimientos.buscar.html',
        controller: 'Venta.Caja.Movimientos.BuscarController',
        resolve: {

        },
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('venta.app.caja.movimientos.editar', {
        url: '/editar/:venta',
        templateUrl: 'modules/venta/views/caja/caja.movimientos.editar.html',
        resolve: {
          /*tipoDocumento: function ($state, $stateParams, SGTipoDocumento) {
            return SGTipoDocumento.$find($stateParams.documento);
          }*/
        },
        controller: 'Venta.Caja.Movimientos.EditarController',
        ncyBreadcrumb: {
          label: 'Editar venta',
          parent: 'venta.app.caja.movimiento.buscar'
        }
      })

      .state('venta.app.operaciones.venta', {
        url: '/venta',
        templateUrl: 'modules/venta/views/venta/venta.crear.html',
        controller: 'Venta.CrearController',
        resolve: {

        },
        ncyBreadcrumb: {
          skip: true
        }
      });
  }
]);
