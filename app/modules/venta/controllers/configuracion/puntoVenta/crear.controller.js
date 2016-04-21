'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.CrearController',
  function ($scope, $state, SCDialog, OSPuntoVenta, toastr) {

    $scope.working = false;

    $scope.view = {
      puntoVenta: OSPuntoVenta.$build()
    };

    $scope.save = function () {
      SCDialog.confirm('Guardar', 'Estas seguro de crear el punto de venta?', function () {
        $scope.working = true;
        $scope.view.puntoVenta.$save().then(
          function (response) {
            $scope.working = false;
            toastr.success('Punto de venta creado.');
            $state.go('^.editar', {puntoVenta: response.id});
          },
          function error(err) {
            $scope.working = false;
            toastr.error(err.data.errorMessage);
          }
        );
      });
    };

  }
);
