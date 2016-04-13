'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Busqueda.BusquedaProducto.ManualController',
  function ($scope, $state) {

    $scope.view = function () {
        producto: undefined
    };

    $scope.addProducto = function () {
      if(!$scope.form.$invalid) {
        var producto = angular.copy($scope.view.producto);
        $scope.view.producto = undefined;
        $scope.$parent.view.productos.push(producto);
        $scope.form.$submitted = false;
      } else {
        $scope.form.$submitted = true;
      }
    };

  }
);
