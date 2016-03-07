'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Caja.CerrarController',
  function ($scope, $state) {


    $scope.detalle = [
      { denominacion: 0.20, cantidad: 0, getSubtotal: function () { return 0; } },
      { denominacion: 0.20, cantidad: 0, getSubtotal: function () { return 0; } },
      { denominacion: 0.20, cantidad: 0, getSubtotal: function () { return 0; } },
      { denominacion: 0.20, cantidad: 0, getSubtotal: function () { return 0; } },
      { denominacion: 0.20, cantidad: 0, getSubtotal: function () { return 0; } }
    ];

  }
);
