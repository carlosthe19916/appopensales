'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Crear.Modal.CantidadProductoController',
  function ($scope, $uibModalInstance, producto, OSSession) {
    
    $scope.view = {
      producto: angular.copy(producto)
    };
    $scope.view.producto.cantidad = producto.cantidad || 1;

    $scope.combo = {
      almacen: OSSession.almacenes,
      marca: [],
      unidadMedida: []
    };
    $scope.combo.selected = {
      almacen: OSSession.almacenes[0],
      marca: undefined,
      unidadMedida: undefined
    };

    var loadCombos = function () {
      if(!$scope.combo.selected.almacen) {
        return;
      }
      $scope.combo.marca = [];
      $scope.combo.unidadMedida = [];
      producto.stock.forEach(function (row) {
        if(row.almacen.id == $scope.combo.selected.almacen.id) {
          $scope.combo.marca.push({denominacion: row.marca, valor: row.idcMarca,  idProductoMarca: row.idProductoMarca});
          $scope.combo.unidadMedida.push({denominacion: row.unidadMedida, valor: row.idcUnidadMedida});
        }
      });
      $scope.combo.selected.marca = $scope.combo.marca[0];
      $scope.combo.selected.unidadMedida = $scope.combo.unidadMedida[0];
    };
    loadCombos();

    $scope.$watch('combo.selected.almacen', function (newVal, oldVal) {
      if(newVal !== oldVal) {
        loadCombos();
      }
    }, true);

    $scope.add = function () {
      $scope.view.producto.cantidad++;
    };
    $scope.substract = function () {
      if($scope.view.producto.cantidad > 1) $scope.view.producto.cantidad--;
    };

    $scope.ok = function () {
      if(!$scope.combo.selected.almacen) return;
      if(!$scope.combo.selected.marca) return;
      if(!$scope.combo.selected.unidadMedida) return;
      
      $scope.view.producto.almacen = $scope.combo.selected.almacen;
      $scope.view.producto.marca = $scope.combo.selected.marca;
      $scope.view.producto.unidadMedida = $scope.combo.selected.unidadMedida;

      $uibModalInstance.close($scope.view.producto);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }
);
