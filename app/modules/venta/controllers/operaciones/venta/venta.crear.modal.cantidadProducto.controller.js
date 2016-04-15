'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Crear.Modal.CantidadProductoController',
  function ($scope, $uibModalInstance) {

    $scope.cantidad = 1;

    $scope.add = function () {
      $scope.cantidad = $scope.cantidad + 1;
    };
    $scope.substract = function () {
      if($scope.cantidad > 1) $scope.cantidad--;
    };

    $scope.ok = function () {
      $uibModalInstance.close($scope.cantidad);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }
);
