'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Caja.CrearController',
  function ($scope, $state, toastr, puntoVenta, SCDialog, OSCaja) {

    $scope.working = false;

    $scope.view = {
      puntoVenta: puntoVenta,
      caja: OSCaja.$build()
    };

    $scope.save = function () {
      SCDialog.confirm('Guardar', 'Estas seguro de crear la caja?', function () {
        $scope.view.caja.expediente = {
          id: puntoVenta.id
        };

        $scope.working = true;
        $scope.view.caja.$save().then(
          function (response) {
            $scope.working = false;
            toastr.success('Caja creada.');
            $state.go('^.buscar');
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
