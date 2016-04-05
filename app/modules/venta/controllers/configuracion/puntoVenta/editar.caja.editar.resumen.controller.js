'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Caja.Editar.ResumenController',
  function ($scope, $state, toastr, puntoVenta, caja, SCDialog, OSCaja) {

    $scope.view = {
      caja: caja
    };

  }
);
