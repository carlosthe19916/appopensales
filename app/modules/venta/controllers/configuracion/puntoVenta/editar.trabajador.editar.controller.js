'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Trabajador.EditarController',
  function ($scope, $state, toastr, puntoVenta, trabajador, SCDialog, OSCaja) {

    $scope.view = {
      trabajador: trabajador
    };

    $scope.activar = function () {
      SCDialog.confirm('Guardar', 'Estas seguro de activar el Trabajador?', function () {
        $scope.view.trabajador.$enable().then(function (response) {
          toastr.success('Trabajador activado.');
          $state.reload();
        }, function error(err) {
          toastr.error(err.data.message);
        });
      });
    };

    $scope.desactivar = function () {
      SCDialog.confirm('Guardar', 'Estas seguro de desactivar el Trabajador?', function () {
        $scope.view.caja.$disable().then(function (response) {
          toastr.success('Trabajador desactivado.');
          $state.reload();
        }, function error(err) {
          toastr.error(err.data.message);
        });
      });
    };

    $scope.remove = function () {
      SCDialog.confirmDelete($scope.view.trabajador.nombres + ' ' + $scope.view.trabajador.apellidoPaterno, 'Trabajador', function () {
        $scope.view.trabajador.$remove().then(function (response) {
          toastr.success('Trabajador eliminado.');
          $state.go('^.^.buscar');
        }, function error(err) {
          toastr.error(err.data.message);
        });
      });
    };

  }
);
