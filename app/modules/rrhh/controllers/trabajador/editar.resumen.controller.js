'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Trabajador.Editar.ResumenController',
  function ($scope, $state, trabajador) {

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

  });
