'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Busqueda.BusquedaProducto.FiltroController',
  function ($scope, $state, $uibModal, OSProducto) {

    $scope.paginationOptions = {
      page: 1,
      pageSize: 10
    };

    $scope.filterOptions = {
      filterText: undefined
    };

    $scope.gridOptions = {
      data: []
    };
    $scope.gridActions = {
      enviar: function (item, e) {
        var modalInstance = $uibModal.open({
          templateUrl: 'modules/venta/views/operaciones/venta/venta.crear.modal.cantidadProducto.html',
          controller: 'Venta.Crear.Modal.CantidadProductoController'
        });
        modalInstance.result.then(function (cantidad) {
          item.cantidad = cantidad;
          $scope.addProducto(item);
        }, function () {
        });
      },
      ver: function (item, e) {
        var modalInstance = $uibModal.open({
          templateUrl: 'modules/venta/views/operaciones/venta/venta.crear.modal.verProducto.html',
          controller: 'Venta.Crear.Modal.VerProductoController'
        });
        modalInstance.result.then(function (cantidad) {
          item.cantidad = cantidad;
          $scope.addProducto(item);
        }, function () {
        });
      }
    };

    $scope.addProducto = function (item) {
      var producto = angular.copy(item);
      $scope.$parent.view.productos.push(producto);
    };

    $scope.search = function () {
      var criteria = {
        filterText: $scope.filterOptions.filterText,
        filters: [],
        orders: [],
        paging: $scope.paginationOptions
      };

      OSProducto.$search(criteria).then(function (response) {
        $scope.gridOptions.data = response.items;
        $scope.gridOptions.totalItems = response.totalSize;
      }, function error(err) {
        toastr.error('El servidor no responde, intentelo nuevamente.');
      });
    };

  }
);
