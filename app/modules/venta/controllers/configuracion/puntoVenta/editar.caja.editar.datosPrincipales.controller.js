'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Caja.Editar.DatosPrincipalesController',
  function ($scope, $state, toastr, puntoVenta, caja, SCDialog, OSCaja) {

    $scope.working = false;

    $scope.view = {
      caja: caja
    };

    $scope.save = function() {
      $scope.working = true;
      $scope.view.caja.$save().then(
        function (response) {
          $scope.working = false;
          toastr.success('Caja actualizada.');
        },
        function error(err) {
          $scope.working = false;
          toastr.error(err.data.errorMessage);
        }
      );
    };

  }
);
