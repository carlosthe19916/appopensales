'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Caja.EditarController',
  function ($scope, $state, toastr, puntoVenta, caja, SCDialog, OSCaja) {

    $scope.view = {
      caja: caja
    };

    $scope.activar = function () {
      SCDialog.confirm('Guardar', 'Estas seguro de activar la Caja?', function () {
        $scope.view.caja.$enable().then(function (response) {
          toastr.success('Caja activada.');
          $state.reload();
        }, function error(err) {
          toastr.error(err.data.errorMessage);
        });
      });
    };

    $scope.desactivar = function () {
      SCDialog.confirm('Guardar', 'Estas seguro de desactivar la Caja?', function () {
        $scope.view.caja.$disable().then(function (response) {
          toastr.success('Caja desactivada.');
          $state.reload();
        }, function error(err) {
          toastr.error(err.data.errorMessage);
        });
      });
    };

    $scope.remove = function () {
      SCDialog.confirmDelete($scope.view.caja.denominacion, 'Caja', function () {
        $scope.view.caja.$remove().then(function (response) {
          toastr.success('Caja eliminada.');
          $state.go('^.^.buscar');
        }, function error(err) {
          toastr.error(err.data.errorMessage);
        });
      });
    };

  }
);
