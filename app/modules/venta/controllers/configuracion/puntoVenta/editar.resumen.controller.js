'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Editar.ResumenController',
  function ($scope, $state, puntoVenta) {

    $scope.view = {
      puntoVenta: puntoVenta
    };

    $scope.view.load = {
      cajas: []
    };

    $scope.loadCajas = function () {
      $scope.view.puntoVenta.OPCaja().$getAll({estado: true}).then(function (response) {
        $scope.view.load.cajas = response;
      });
    };
    $scope.loadCajas();

  }
);
