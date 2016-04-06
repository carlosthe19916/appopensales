'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Trabajador.CrearController',
  function ($scope, $state, toastr, puntoVenta, SCDialog, OSTrabajador) {

    $scope.working = false;

    $scope.view = {
      puntoVenta: puntoVenta,
      trabajador: OSTrabajador.$build()
    };

    $scope.save = function () {
      SCDialog.confirm('Guardar', 'Estas seguro de crear el trabajador?', function () {
        /*$scope.view.caja.expediente = {
          id: puntoVenta.id
        };*/

        $scope.working = true;
        $scope.view.trabajador.$save().then(
          function (response) {
            $scope.working = false;
            toastr.success('Trabajador creado.');
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
