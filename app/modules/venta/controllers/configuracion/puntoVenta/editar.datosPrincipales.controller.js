'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Editar.DatosPrincipalesController',
  function ($scope, $state, toastr, puntoVenta) {

    $scope.view = {
      puntoVenta: puntoVenta
    };

    $scope.save = function() {
      $scope.view.puntoVenta.$save().then(
        function (response) {
          $scope.working = false;
          toastr.success('Punto de venta actualizado.');
        },
        function error(err) {
          $scope.working = false;
          toastr.error(err.data.message);
        }
      );
    };

  }
);
