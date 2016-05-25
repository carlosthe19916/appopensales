'use strict';

/* jshint -W098 */
angular.module('almacen').controller('Almacen.Producto.Editar.ResumenController',
  function ($scope, $state, producto) {

    $scope.view = {
      producto: producto
    };

  });
