'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Trabajador.Editar.ResumenController',
  function ($scope, $state, toastr, puntoVenta, trabajador, SCDialog, OSCaja) {

    $scope.view = {
      trabajador: trabajador
    };

    $scope.view.load = {
      cajas: []
    };

    $scope.loadCajas = function () {
      $scope.view.trabajador.OSCaja().$getAll({estado: true}).then(function (response) {
        $scope.view.load.cajas = response;
      });
    };
    $scope.loadCajas();

  }
);
