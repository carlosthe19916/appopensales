'use strict';

// Setting up route
angular.module('almacen').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/almacen/app/almacenes/almacenes', '/almacen/app/almacenes/almacenes/buscar');
    $urlRouterProvider.when('/almacen/app/almacenes/almacenes/editar/:almacen', '/almacen/app/almacenes/almacenes/editar/:almacen/resumen');

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
      })

      .state('almacen.app.almacen', {
        url: '/almacenes',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state('almacen.app.producto', {
        url: '/productos',
        template: '<div ui-view></div>',
        abstract: true
      })

      .state('almacen.app.almacen.almacen', {
        url: '/almacenes',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('almacen.app.almacen.almacen.buscar', {
        url: '/buscar',
        templateUrl: 'modules/almacen/views/almacen/buscar.html',
        controller: 'Almacen.Almacen.BuscarController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Home'
        },
        data: {
          pageTitle: 'Almacenes'
        }
      })
      .state('almacen.app.almacen.almacen.crear', {
        url: '/crear',
        templateUrl: 'modules/almacen/views/almacen/crear.html',
        controller: 'Almacen.Almacen.CrearController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Crear almacen',
          parent: 'almacen.app.almacen.almacen.buscar'
        }
      })
      .state('almacen.app.almacen.almacen.editar', {
        url: '/editar/:almacen',
        templateUrl: 'modules/almacen/views/almacen/editar.html',
        resolve: {
          almacen: function ($state, $stateParams, OSAlmacen) {
            return OSAlmacen.$find($stateParams.almacen);
          }
        },
        controller: 'Almacen.Almacen.EditarController',
        ncyBreadcrumb: {
          label: 'Editar almacen',
          parent: 'almacen.app.almacen.almacen.buscar'
        },
        data: {
          pageTitle: 'Editar almacen'
        }
      })
      .state('almacen.app.almacen.almacen.editar.resumen', {
        url: '/resumen',
        templateUrl: 'modules/almacen/views/almacen/editar.resumen.html',
        controller: 'Almacen.Almacen.Editar.ResumenController',
        resolve: {},
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('almacen.app.almacen.almacen.editar.datosPrincipales', {
        url: '/datosPrincipales',
        templateUrl: 'modules/almacen/views/almacen/editar.datosPrincipales.html',
        controller: 'Almacen.Almacen.Editar.DatosPrincipalesController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Datos principales'
        }
      })


      .state('almacen.app.producto.producto', {
        url: '/productos',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('almacen.app.producto.producto.buscar', {
        url: '/buscar',
        templateUrl: 'modules/almacen/views/producto/buscar.html',
        controller: 'Almacen.Producto.BuscarController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Home'
        },
        data: {
          pageTitle: 'Productos'
        }
      });

  }
]);
