'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Editar.ResumenController',
  function ($scope, $state, toastr, puntoVenta, SCDialog, OSCaja, OSTrabajador) {

    $scope.view = {
      puntoVenta: puntoVenta
    };

    $scope.paginationOptions = {
      caja : {
        page: 1,
        pageSize: 5
      },
      trabajador: {
        page: 1,
        pageSize: 5
      }
    };

    $scope.gridOptions = {
      caja: {
        data: [],
        totalItems: 5
      },
      trabajador: {
        data: [],
        totalItems: 5
      }
    };

    $scope.$watchGroup(['paginationOptions.caja.page','paginationOptions.caja.pageSize'], function(newVals, oldVals){
      if($scope.paginationOptions.caja.page && $scope.paginationOptions.caja.pageSize) {
        $scope.gridOptions.caja.totalItems =  ($scope.paginationOptions.caja.page + 2) * $scope.paginationOptions.caja.pageSize;
      }
    });
    $scope.$watchGroup(['paginationOptions.trabajador.page','paginationOptions.trabajador.pageSize'], function(newVals, oldVals){
      if($scope.paginationOptions.trabajador.page && $scope.paginationOptions.trabajador.pageSize) {
        $scope.gridOptions.trabajador.totalItems =  ($scope.paginationOptions.trabajador.page + 2) * $scope.paginationOptions.trabajador.pageSize;
      }
    });

    $scope.gridActions = {
      caja: {
        edit: function (row) {
          $state.go('^.cajas.editar', {caja: row.id});
        },
        remove: function(row) {
          SCDialog.confirmDelete(row.denominacion, 'Caja', function(){
            OSCaja.$new(row.id).$remove().then(
              function (response) {
                toastr.success('Caja eliminada.');
                $scope.gridOptions.caja.data.splice(index, 1);
              },
              function error(err) {
                toastr.error(err.data.errorMessage);
              }
            );
          });
        }
      },
      trabajador: {
        edit: function (row) {
          $state.go('^.trabajadores.editar', {trabajador: row.id});
        },
        remove: function(row) {
          SCDialog.confirmDelete(row.denominacion, 'Trabajador', function(){
            OSTrabajador.$new(row.id).$remove().then(
              function (response) {
                toastr.success('Trabajador eliminado.');
                $scope.gridOptions.trabajador.data.splice(index, 1);
              },
              function error(err) {
                toastr.error(err.data.errorMessage);
              }
            );
          });
        }
      }
    };

    $scope.loadCajas = function () {
      var firstResult = ($scope.paginationOptions.caja.page - 1) * $scope.paginationOptions.caja.pageSize ;
      var maxResults = ($scope.paginationOptions.caja.page * $scope.paginationOptions.caja.pageSize) - 1;
      $scope.view.puntoVenta.OSCaja().$getAll({estado: true, firstResult: firstResult, maxResults: maxResults}).then(function (response) {
        $scope.gridOptions.caja.data = response;
      });
    };
    $scope.loadCajas();

    $scope.loadTrabajadores = function () {
      var firstResult = ($scope.paginationOptions.trabajador.page - 1) * $scope.paginationOptions.trabajador.pageSize;
      var maxResults = ($scope.paginationOptions.trabajador.page * $scope.paginationOptions.trabajador.pageSize) -1;
      $scope.view.puntoVenta.OSTrabajador().$getAll({estado: true, firstResult: firstResult, maxResults: maxResults}).then(function (response) {
        $scope.gridOptions.trabajador.data = response;
      });
    };
    $scope.loadTrabajadores();

  }
);
