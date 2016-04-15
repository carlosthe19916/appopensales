'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Crear.Modal.CantidadProductoController',
  function ($scope, $uibModalInstance, producto) {

    $scope.view = {
      producto: producto
    };
    $scope.view.producto.cantidad = 1;

    $scope.add = function () {
      $scope.view.producto.cantidad++;
    };
    $scope.substract = function () {
      if($scope.view.producto.cantidad > 1) $scope.view.producto.cantidad--;
    };

    $scope.ok = function () {
      $uibModalInstance.close($scope.view.producto);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }
);
