'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Caja.BuscarController',
  function ($scope, $state, toastr, puntoVenta, SCDialog, OSCaja) {

    $scope.view = {
      puntoVenta: puntoVenta
    };

    $scope.view.load = {
      cajas: []
    };

    $scope.filterOptions = {
      filterText: undefined
    };

    $scope.gridOptions = {
      data: [],
      paginationPageSizes: [10, 25, 50],
      paginationPageSize: 10
    };
    $scope.gridActions = {
      edit: function (row) {
        $state.go('^.edit', {form: row.id});
      },
      remove: function(row) {
        SGDialog.confirmDelete(row.title, 'Encuesta', function() {
          SCForm.$new(row.id).$remove().then(
            function(response){
              toastr.success('Encuesta eliminada satisfactoriamente');
              $scope.search();
            },
            function error(err){
              toastr.error(err.data.errorMessage);
            }
          );
        });
      }
    };

    $scope.gridActions = {
      edit: function (row) {
        $state.go('^.editar', {caja: row.id});
      },
      remove: function (row, index) {
        SCDialog.confirmDelete(row.denominacion, 'Caja', function(){
          OSCaja.$new(row.id).$remove().then(
            function (response) {
              toastr.success('Caja eliminada.');
              $scope.gridOptions.data.splice(index, 1);
            },
            function error(err) {
              toastr.error(err.data.message);
            }
          );
        });
      }
    };

    $scope.search = function () {
      $scope.view.puntoVenta.OPCaja().$getAll({estado: true}).then(function (response) {
        $scope.gridOptions.data = response;
      });
    };
    $scope.search();


  }
);
