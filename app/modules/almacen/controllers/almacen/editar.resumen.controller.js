'use strict';

/* jshint -W098 */
angular.module('almacen').controller('Almacen.Almacen.Editar.ResumenController',
  function ($scope, $state, almacen) {

    $scope.view = {
      almacen: almacen
    };

  });
