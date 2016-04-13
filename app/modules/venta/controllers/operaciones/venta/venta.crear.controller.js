'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.CrearController',
  function ($scope, $state, toastr, SCDialog, OSPersona) {

    $scope.view = {
      productos: []
    };

    $scope.view.load = {
      cliente: {}
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

    $scope.devolverProducto = function (item, $index) {
      SCDialog.confirm('Guardar', 'Estas seguro de devolver el producto?', function () {
        $scope.view.productos.splice($index, 1);
      });
    };

  }
);
