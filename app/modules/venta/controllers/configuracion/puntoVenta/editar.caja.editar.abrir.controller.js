'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Caja.Editar.AbrirController',
  function ($scope, $state, toastr, puntoVenta, caja, SCDialog, OSCaja) {

    $scope.working = false;

    $scope.view = {
      caja: caja
    };

    $scope.view.load = {
      historial: undefined
    };

    $scope.loadHistorialActivo = function () {
      $scope.view.caja.OSCajaHistorialApertura().$getAll({estado: true}).then(function (response) {
        $scope.view.load.historial = response[0];
      });
    };
    $scope.loadHistorialActivo();

    $scope.save = function() {
      SCDialog.confirm('Guardar', 'Estas seguro de abrir la caja?', function () {
        $scope.working = true;
        $scope.view.caja.$abrir().then(
          function (response) {
            $scope.working = false;
            toastr.success('Caja abierta.');
          },
          function error(err) {
            $scope.working = false;
            toastr.error(err.data.message);
          }
        );
      });
    };

  }
);
