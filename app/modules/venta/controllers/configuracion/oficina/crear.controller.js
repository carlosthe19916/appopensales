'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.Oficina.CrearController',
  function ($scope, $state) {


    $scope.save = function () {
      $state.go('venta.app.configuracion.oficina.editar', {oficina: 123});
    };

  }
);
