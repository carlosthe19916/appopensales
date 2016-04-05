'use strict';

// Setting up route
angular.module('venta').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/venta/app/configuracion/puntosVenta', '/venta/app/configuracion/puntosVenta/buscar');
    $urlRouterProvider.when('/venta/app/configuracion/puntosVenta/editar/:puntoVenta', '/venta/app/configuracion/puntosVenta/editar/:puntoVenta/resumen');

    $urlRouterProvider.when('/venta/app/configuracion/puntosVenta/editar/:puntoVenta/cajas', '/venta/app/configuracion/puntosVenta/editar/:puntoVenta/cajas/buscar');
    $urlRouterProvider.when('/venta/app/configuracion/puntosVenta/editar/:puntoVenta/cajas/editar/:caja', '/venta/app/configuracion/puntosVenta/editar/:puntoVenta/cajas/editar/:caja/resumen');

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

      .state('venta.app.configuracion.puntoVenta', {
        url: '/puntosVenta',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('venta.app.configuracion.puntoVenta.buscar', {
        url: '/buscar',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/buscar.html',
        controller: 'Venta.Configuracion.PuntoVenta.BuscarController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('venta.app.configuracion.puntoVenta.crear', {
        url: '/crear',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/crear.html',
        controller: 'Venta.Configuracion.PuntoVenta.CrearController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Crear oficina',
          parent: 'venta.app.configuracion.puntoVenta.buscar'
        }
      })
      .state('venta.app.configuracion.puntoVenta.editar', {
        url: '/editar/:puntoVenta',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/editar.html',
        resolve: {
          puntoVenta: function ($state, $stateParams, OSPuntoVenta) {
            return OSPuntoVenta.$find($stateParams.puntoVenta);
          }
        },
        controller: 'Venta.Configuracion.PuntoVenta.EditarController',
        ncyBreadcrumb: {
          label: 'Editar punto venta',
          parent: 'venta.app.configuracion.puntoVenta.buscar'
        }
      })
      .state('venta.app.configuracion.puntoVenta.editar.resumen', {
        url: '/resumen',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/editar.resumen.html',
        controller: 'Venta.Configuracion.PuntoVenta.Editar.ResumenController',
        resolve: {},
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('venta.app.configuracion.puntoVenta.editar.datosPrincipales', {
        url: '/datosPrincipales',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/editar.datosPrincipales.html',
        controller: 'Venta.Configuracion.PuntoVenta.Editar.DatosPrincipalesController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Datos principales'
        }
      })
      .state('venta.app.configuracion.puntoVenta.editar.cajas', {
        url: '/cajas',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('venta.app.configuracion.puntoVenta.editar.cajas.buscar', {
        url: '/buscar',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/editar.cajas.buscar.html',
        controller: 'Venta.Configuracion.PuntoVenta.Caja.BuscarController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Cajas'
        }
      })
      .state('venta.app.configuracion.puntoVenta.editar.cajas.crear', {
        url: '/crear',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/editar.cajas.crear.html',
        controller: 'Venta.Configuracion.PuntoVenta.Caja.CrearController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Crear caja',
          parent: 'venta.app.configuracion.puntoVenta.editar.cajas.buscar'
        }
      })
      .state('venta.app.configuracion.puntoVenta.editar.cajas.editar', {
        url: '/editar/:caja',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/editar.cajas.editar.html',
        resolve: {
          caja: function ($state, $stateParams, OSCaja) {
            return OSCaja.$find($stateParams.caja);
          }
        },
        controller: 'Venta.Configuracion.PuntoVenta.Caja.EditarController',
        ncyBreadcrumb: {
          label: 'Editar caja',
          parent: 'venta.app.configuracion.puntoVenta.editar.cajas.buscar'
        }
      })
      .state('venta.app.configuracion.puntoVenta.editar.cajas.editar.resumen', {
        url: '/resumen',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/editar.cajas.editar.resumen.html',
        controller: 'Venta.Configuracion.PuntoVenta.Caja.Editar.ResumenController',
        resolve: {},
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('venta.app.configuracion.puntoVenta.editar.cajas.editar.datosPrincipales', {
        url: '/datosPrincipales',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/editar.cajas.editar.datosPrincipales.html',
        controller: 'Venta.Configuracion.PuntoVenta.Caja.Editar.DatosPrincipalesController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Datos principales'
        }
      })
      .state('venta.app.configuracion.puntoVenta.editar.cajas.editar.abrir', {
        url: '/abrir',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/editar.cajas.editar.abrir.html',
        controller: 'Venta.Configuracion.PuntoVenta.Caja.Editar.AbrirController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Abrir caja'
        }
      })
      .state('venta.app.configuracion.puntoVenta.editar.cajas.editar.cerrar', {
        url: '/cerrar',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/editar.cajas.editar.cerrar.html',
        controller: 'Venta.Configuracion.PuntoVenta.Caja.Editar.CerrarController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Cerrar caja'
        }
      });
  }
]);
