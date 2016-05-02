'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.CrearController',
  function ($scope, $state, $uibModal, toastr, SCDialog, OSVenta, OSPersona) {

    $scope.working = false;

    $scope.view = {
      venta: OSVenta.$build(),
      productos: []
    };

    $scope.view.load = {
      cliente: {}
    };

    $scope.getTotal = function () {
      var result = 0;
      $scope.view.productos.forEach(function (row) {
        result = result + (row.cantidad * row.precio);
      });
      return result;
    };

    $scope.buscarCliente = function ($event) {
      if (!angular.isUndefined($event)) {
        $event.preventDefault();
      }

      if(!$scope.view.load.cliente.numeroDocumento) {
        $scope.view.load.cliente = {};
        return;
      }

      //Warning! hard code set on criteria.
      var criteria = {
        tipoDocumento: 37,
        numeroDocumento: $scope.view.load.cliente.numeroDocumento
      };
      OSPersona.$getAll(criteria).then(function (response) {
        $scope.view.load.cliente = response[0];
        if ($scope.view.load.cliente) {
          toastr.info('Persona encontrada');
        } else {
          toastr.warning('Persona no encontrada');
        }
      });
    };

    $scope.editarProducto = function (item, $index) {
      var modalInstance = $uibModal.open({
        templateUrl: 'modules/venta/views/operaciones/venta/venta.crear.modal.cantidadProducto.html',
        controller: 'Venta.Crear.Modal.CantidadProductoController',
        resolve: {
          producto: item
        }
      });
      modalInstance.result.then(function (itemUpdated) {
        $scope.view.productos[$index] = itemUpdated;
      }, function () {});
    };
    $scope.devolverProducto = function (item, $index) {
      SCDialog.confirm('Guardar', 'Estas seguro de devolver el producto?', function () {
        $scope.view.productos.splice($index, 1);
      });
    };

    $scope.save = function () {
      SCDialog.confirm('Guardar', 'Estas seguro de realizar la venta?', function () {
        $scope.working = true;
        $scope.view.venta.$save().then(
          function (response) {
            $scope.working = false;
            toastr.success('Venta realizada.');
            $state.go('^.editar', {puntoVenta: response.id});
          },
          function error(err) {
            $scope.working = false;
            toastr.error(err.data.errorMessage);
          }
        );
      });
    };

    $scope.limpiar = function () {
      $scope.view.productos = [];
      $scope.view.load.cliente = {};
    };

  }
);
