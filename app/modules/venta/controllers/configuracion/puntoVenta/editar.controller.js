'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.EditarController',
  function ($scope, $state, puntoVenta) {

    $scope.view = {
        puntoVenta: puntoVenta
    };
  }
);
