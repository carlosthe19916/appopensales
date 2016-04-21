'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.EditarController',
  function ($scope, $state, toastr, puntoVenta, SCDialog) {

    $scope.view = {
        puntoVenta: puntoVenta
    };

    $scope.activar = function () {
      SCDialog.confirm('Guardar', 'Estas seguro de activar el Punto de Venta?', function () {
        $scope.view.puntoVenta.$enable().then(function (response) {
          toastr.success('Punto de venta activado.');
          $state.reload();
        }, function error(err) {
          toastr.error(err.data.errorMessage);
        });
      });
    };

    $scope.desactivar = function () {
      SCDialog.confirm('Guardar', 'Estas seguro de desactivar el Punto de Venta?', function () {
        $scope.view.puntoVenta.$disable().then(function (response) {
          toastr.success('Punto de venta desactivado.');
          $state.reload();
        }, function error(err) {
          toastr.error(err.data.errorMessage);
        });
      });
    };

    $scope.remove = function () {
      SCDialog.confirmDelete($scope.view.puntoVenta.nombreObra, 'Punto de Venta', function () {
        $scope.view.puntoVenta.$remove().then(function (response) {
          toastr.success('Punto de venta eliminado.');
          $state.go('venta.app.configuracion.puntoVenta.buscar');
        }, function error(err) {
          toastr.error(err.data.errorMessage);
        });
      });
    };

  }
);
