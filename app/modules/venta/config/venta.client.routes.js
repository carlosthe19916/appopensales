'use strict';

// Setting up route
angular.module('venta').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/venta/app/configuracion/oficinas', '/venta/app/configuracion/oficinas/buscar');
    $urlRouterProvider.when('/venta/app/configuracion/oficinas/editar/:oficina', '/venta/app/configuracion/oficinas/editar/:oficina/resumen');

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
      .state('venta.app.configuracion', {
        url: '/configuracion',
        template: '<div ui-view></div>',
        abstract: true
      })

      .state('venta.app.caja.abrir', {
        url: '/abrir',
        templateUrl: 'modules/venta/views/caja/caja.abrir.html',
        controller: 'Venta.Caja.AbrirController',
        resolve: {},
        ncyBreadcrumb: {
          skip: true
        }
      })
      .state('venta.app.caja.cerrar', {
        url: '/cerrar',
        templateUrl: 'modules/venta/views/caja/caja.cerrar.html',
        controller: 'Venta.Caja.CerrarController',
        resolve: {},
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
        resolve: {},
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
        resolve: {},
        ncyBreadcrumb: {
          skip: true
        }
      })

      .state('venta.app.configuracion.oficina', {
        url: '/oficinas',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('venta.app.configuracion.oficina.buscar', {
        url: '/buscar',
        templateUrl: 'modules/venta/views/configuracion/oficina/buscar.html',
        controller: 'Venta.Configuracion.Oficina.BuscarController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('venta.app.configuracion.oficina.crear', {
        url: '/crear',
        templateUrl: 'modules/venta/views/configuracion/oficina/crear.html',
        controller: 'Venta.Configuracion.Oficina.CrearController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Crear oficina',
          parent: 'venta.app.configuracion.oficina.buscar'
        }
      })
      .state('venta.app.configuracion.oficina.editar', {
        url: '/editar/:oficina',
        templateUrl: 'modules/venta/views/configuracion/oficina/editar.html',
        resolve: {
          oficina: function ($state, $stateParams, OSOFicina) {
            return OSOFicina.$find($stateParams.oficina);
          }
        },
        controller: 'Venta.Configuracion.Oficina.EditarController',
        ncyBreadcrumb: {
          label: 'Editar oficina',
          parent: 'venta.app.configuracion.oficina.buscar'
        }
      })
      .state('venta.app.configuracion.oficina.editar.resumen', {
        url: '/resumen',
        templateUrl: 'modules/venta/views/configuracion/oficina/editar.resumen.html',
        controller: 'Venta.Configuracion.Oficina.Editar.ResumenController',
        resolve: {},
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      });
  }
]);
