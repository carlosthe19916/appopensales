'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Caja.Editar.ResumenController',
  function ($scope, $state, toastr, puntoVenta, caja, SCDialog, OSCaja) {

    $scope.view = {
      caja: caja
    };

    $scope.view.load = {
      trabajadores: []
    };

    $scope.loadTrabajadores = function () {
      $scope.view.caja.OSTrabajador().$getAll({estado: true}).then(function (response) {
        $scope.view.load.trabajadores = response;
      });
    };
    $scope.loadTrabajadores();

  }
);
