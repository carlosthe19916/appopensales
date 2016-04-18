'use strict';

// Setting up route
angular.module('venta').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // venta START
    $urlRouterProvider.when('/venta/app/operaciones/venta', '/venta/app/operaciones/venta/buscar');
    $urlRouterProvider.when('/venta/app/operaciones/venta/buscar', '/venta/app/operaciones/venta/buscar/browse');
    // venta END

    // punto de venta START
    $urlRouterProvider.when('/venta/app/configuracion/puntosVenta', '/venta/app/configuracion/puntosVenta/buscar');
    $urlRouterProvider.when('/venta/app/configuracion/puntosVenta/editar/:puntoVenta', '/venta/app/configuracion/puntosVenta/editar/:puntoVenta/resumen');

    $urlRouterProvider.when('/venta/app/configuracion/puntosVenta/editar/:puntoVenta/cajas', '/venta/app/configuracion/puntosVenta/editar/:puntoVenta/cajas/buscar');
    $urlRouterProvider.when('/venta/app/configuracion/puntosVenta/editar/:puntoVenta/cajas/editar/:caja', '/venta/app/configuracion/puntosVenta/editar/:puntoVenta/cajas/editar/:caja/resumen');
    $urlRouterProvider.when('/venta/app/configuracion/puntosVenta/editar/:puntoVenta/trabajadores', '/venta/app/configuracion/puntosVenta/editar/:puntoVenta/trabajadores/buscar');
    $urlRouterProvider.when('/venta/app/configuracion/puntosVenta/editar/:puntoVenta/trabajadores/editar/:trabajador', '/venta/app/configuracion/puntosVenta/editar/:puntoVenta/trabajadores/editar/:trabajador/resumen');
    // punto de venta END

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

      //operaciones.venta START
      .state('venta.app.operaciones.venta', {
        url: '/venta',
        templateUrl: 'modules/venta/views/operaciones/venta/venta.crear.html',
        controller: 'Venta.CrearController',
        resolve: {},
        ncyBreadcrumb: {
          skip: true
        }
      })
      .state('venta.app.operaciones.venta.busqueda', {
        url: '/buscar',
        templateUrl: 'modules/venta/views/operaciones/venta/venta.crear.busquedaProducto.html',
        controller: 'Venta.Crear.BusquedaProductoController',
        resolve: {}
      })
      .state('venta.app.operaciones.venta.busqueda.manual', {
        url: '/manual',
        templateUrl: 'modules/venta/views/operaciones/venta/venta.crear.busquedaProducto.manual.html',
        controller: 'Venta.Busqueda.BusquedaProducto.ManualController',
        resolve: {}
      })
      .state('venta.app.operaciones.venta.busqueda.escaneo', {
        url: '/escaneo',
        templateUrl: 'modules/venta/views/operaciones/venta/venta.crear.busquedaProducto.escaneo.html',
        controller: 'Venta.Busqueda.BusquedaProducto.EscaneoController',
        resolve: {}
      })
      .state('venta.app.operaciones.venta.busqueda.filtro', {
        url: '/filtro',
        templateUrl: 'modules/venta/views/operaciones/venta/venta.crear.busquedaProducto.filtro.html',
        controller: 'Venta.Busqueda.BusquedaProducto.FiltroController',
        resolve: {}
      })
      .state('venta.app.operaciones.venta.busqueda.browse', {
        url: '/browse',
        templateUrl: 'modules/venta/views/operaciones/venta/venta.crear.busquedaProducto.browse.html',
        controller: 'Venta.Busqueda.BusquedaProducto.BrowseController',
        resolve: {}
      })

      .state('venta.app.operaciones.movimientos', {
        url: '/movimientos',
        templateUrl: 'modules/venta/views/operaciones/movimientos/buscar.html',
        controller: 'Operaciones.BuscarController',
        resolve: {},
        ncyBreadcrumb: {
          skip: true
        }
      })
      //operaciones.venta END

      //configuracion.puntoVenta START
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
      })

      .state('venta.app.configuracion.puntoVenta.editar.trabajadores', {
        url: '/trabajadores',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('venta.app.configuracion.puntoVenta.editar.trabajadores.buscar', {
        url: '/buscar',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/editar.trabajadores.buscar.html',
        controller: 'Venta.Configuracion.PuntoVenta.Trabajador.BuscarController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Trabajadores'
        }
      })
      .state('venta.app.configuracion.puntoVenta.editar.trabajadores.crear', {
        url: '/crear',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/editar.trabajadores.crear.html',
        controller: 'Venta.Configuracion.PuntoVenta.Trabajador.CrearController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Crear trabajador',
          parent: 'venta.app.configuracion.puntoVenta.editar.trabajadores.buscar'
        }
      })
      .state('venta.app.configuracion.puntoVenta.editar.trabajadores.editar', {
        url: '/editar/:trabajador',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/editar.trabajadores.editar.html',
        resolve: {
          trabajador: function ($state, $stateParams, OSTrabajador) {
            return OSTrabajador.$find($stateParams.trabajador);
          }
        },
        controller: 'Venta.Configuracion.PuntoVenta.Trabajador.EditarController',
        ncyBreadcrumb: {
          label: 'Editar trabajador',
          parent: 'venta.app.configuracion.puntoVenta.editar.trabajadores.buscar'
        }
      })
      .state('venta.app.configuracion.puntoVenta.editar.trabajadores.editar.resumen', {
        url: '/resumen',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/editar.trabajadores.editar.resumen.html',
        controller: 'Venta.Configuracion.PuntoVenta.Trabajador.Editar.ResumenController',
        resolve: {},
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('venta.app.configuracion.puntoVenta.editar.trabajadores.editar.datosPrincipales', {
        url: '/datosPrincipales',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/editar.trabajadores.editar.datosPrincipales.html',
        controller: 'Venta.Configuracion.PuntoVenta.Trabajador.Editar.DatosPrincipalesController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Datos principales'
        }
      })
      .state('venta.app.configuracion.puntoVenta.editar.trabajadores.editar.cajas', {
        url: '/cajas',
        templateUrl: 'modules/venta/views/configuracion/puntoVenta/editar.trabajadores.editar.cajas.html',
        controller: 'Venta.Configuracion.PuntoVenta.Trabajador.Editar.CajasController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Cajas asignadas'
        }
      });
    //configuracion.puntoVenta END
  }
]);
