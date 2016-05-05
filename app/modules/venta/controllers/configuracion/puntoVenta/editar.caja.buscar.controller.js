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
      filterText: undefined,
      estado: true
    };

    $scope.gridOptions = {
      data: [],
      paginationPageSizes: [10, 25, 50],
      paginationPageSize: 10
    };

    $scope.gridActions = {
      edit: function (row) {
        $state.go('^.editar', {caja: row.id});
      },
      enable: function (row) {
        SCDialog.confirm('Guardar', 'Estas seguro de activar la caja', function(){
          OSCaja.$new(row.id).$enable().then(
            function (response) {
              toastr.success('Caja activada.');
              $scope.search();
            },
            function error(err) {
              toastr.error(err.data.errorMessage);
            }
          );
        });
      },
      disable: function (row) {
        SCDialog.confirm('Guardar', 'Estas seguro de desactivar la caja', function(){
          OSCaja.$new(row.id).$disable().then(
            function (response) {
              toastr.success('Caja desactivada.');
              $scope.search();
            },
            function error(err) {
              toastr.error(err.data.errorMessage);
            }
          );
        });
      },
      remove: function (row, index) {
        /*SCDialog.confirmDelete(row.denominacion, 'Caja', function(){
          OSCaja.$new(row.id).$remove().then(
            function (response) {
              toastr.success('Caja eliminada.');
              $scope.gridOptions.data.splice(index, 1);
            },
            function error(err) {
              toastr.error(err.data.errorMessage);
            }
          );
        });*/
        alert('No se permiten eliminar cajas, pruebe desactivandolas');
      },
      abrir: function (row) {
        $state.go('^.editar.abrir', {caja: row.id});
      },
      cerrar: function (row) {
        $state.go('^.editar.cerrar', {caja: row.id});
      },
      editarDatosPrincipales: function (row) {
        $state.go('^.editar.datosPrincipales', {caja: row.id});
      }
    };

    $scope.search = function () {
      $scope.view.puntoVenta.OSCaja().$getAll({estado: $scope.filterOptions.estado}).then(function (response) {
        $scope.gridOptions.data = response;
      });
    };
    $scope.search();

    $scope.$watch('filterOptions.estado', function(newValue, oldValue) {
      if(newValue !== oldValue) {
        $scope.search();
      }
    }, true);

  }
);
