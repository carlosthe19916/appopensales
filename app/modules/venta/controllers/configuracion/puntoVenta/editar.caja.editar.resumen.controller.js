'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Caja.Editar.ResumenController',
  function ($scope, $state, toastr, puntoVenta, caja, SCDialog, OSCaja) {

    $scope.view = {
      caja: caja
    };

    $scope.view.load = {
      trabajadores: []
    };

    $scope.loadTrabajadores = function () {
      $scope.view.caja.OSTrabajador().$getAll({estado: true}).then(function (response) {
        $scope.view.load.trabajadores = response;
      });
    };
    $scope.loadTrabajadores();

    /**Historiales*/
    $scope.paginationOptions = {
      historial : {
        page: 1,
        pageSize: 5
      }
    };
    $scope.gridOptions = {
      historial: {
        data: [],
        totalItems: 5
      }
    };
    $scope.$watchGroup(['paginationOptions.historial.page','paginationOptions.historial.pageSize'], function(newVals, oldVals){
      if($scope.paginationOptions.historial.page && $scope.paginationOptions.historial.pageSize) {
        $scope.gridOptions.historial.totalItems =  ($scope.paginationOptions.historial.page + 2) * $scope.paginationOptions.historial.pageSize;
      }
    });
    $scope.gridActions = {
      historial: {
        edit: function (row) {
        },
        remove: function(row) {
        }
      }
    };
    $scope.loadHistoriales = function () {
      var firstResult = ($scope.paginationOptions.historial.page - 1) * $scope.paginationOptions.historial.pageSize ;
      var maxResults = ($scope.paginationOptions.historial.page * $scope.paginationOptions.historial.pageSize) - 1;
      $scope.view.caja.OSCajaHistorialApertura().$getAll({estado: true, firstResult: firstResult, maxResults: maxResults}).then(function (response) {
        $scope.gridOptions.historial.data = response;
      });
    };
    $scope.loadHistoriales();

  }
);
