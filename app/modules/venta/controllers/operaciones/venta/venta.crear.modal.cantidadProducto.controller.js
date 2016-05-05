'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Crear.Modal.CantidadProductoController',
  function ($scope, $uibModalInstance, producto, OSSession) {

    $scope.view = {
      producto: angular.copy(producto)
    };
    $scope.view.producto.cantidad = producto.cantidad || 1;


    $scope.combo = {
      almacen: OSSession.almacenes
    };
    $scope.combo.selected = {
      almacen: OSSession.almacenes[0]
    };

    $scope.add = function () {
      $scope.view.producto.cantidad++;
    };
    $scope.substract = function () {
      if($scope.view.producto.cantidad > 1) $scope.view.producto.cantidad--;
    };

    $scope.ok = function () {
      $scope.view.producto.idAlmacen = $scope.combo.selected.almacen.id
      $uibModalInstance.close($scope.view.producto);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }
);
