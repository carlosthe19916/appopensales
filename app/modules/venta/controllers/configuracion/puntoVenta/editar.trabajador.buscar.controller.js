'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Trabajador.BuscarController',
  function ($scope, $state, toastr, puntoVenta, SCDialog, OSTrabajador) {

    $scope.view = {
      puntoVenta: puntoVenta
    };

    $scope.view.load = {
      trabajadores: []
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
        $state.go('^.editar', {trabajador: row.id});
      },
      enable: function (row) {
        SCDialog.confirm('Guardar', 'Estas seguro de activar el trabajador', function(){
          OSTrabajador.$new(row.id).$enable().then(
            function (response) {
              toastr.success('Trabajador activado.');
              $scope.search();
            },
            function error(err) {
              toastr.error(err.data.errorMessage);
            }
          );
        });
      },
      disable: function (row) {
        SCDialog.confirm('Guardar', 'Estas seguro de desactivar el trabajador', function(){
          OSTrabajador.$new(row.id).$disable().then(
            function (response) {
              toastr.success('Trabajador desactivado.');
              $scope.search();
            },
            function error(err) {
              toastr.error(err.data.errorMessage);
            }
          );
        });
      },
      remove: function (row, index) {
        SCDialog.confirmDelete(row.nombres, 'Trabajador', function(){
          OSTrabajador.$new(row.id).$remove().then(
            function (response) {
              toastr.success('Trabajador eliminado.');
              $scope.gridOptions.data.splice(index, 1);
            },
            function error(err) {
              toastr.error(err.data.errorMessage);
            }
          );
        });
      },
      editarDatosPrincipales: function (row) {
        $state.go('^.editar.datosPrincipales', {trabajador: row.id});
      },
      asignarCajas: function (row) {
        $state.go('^.editar.cajas', {trabajador: row.id});
      }
    };

    $scope.search = function () {
      $scope.view.puntoVenta.OSTrabajador().$getAll({estado: $scope.filterOptions.estado}).then(function (response) {
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
