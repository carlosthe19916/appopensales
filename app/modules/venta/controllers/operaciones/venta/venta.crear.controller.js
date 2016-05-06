'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.CrearController',
  function ($scope, $state, $uibModal, hotkeys, toastr, SCDialog, OSVenta, OSTipoDocumento, OSPersona, OSSession) {

    $scope.working = false;

    $scope.view = {
      venta: OSVenta.$build(),

      numeroDocumento: undefined,
      nombreRazonSocial: undefined,
      igv: 0.18,

      productos: [],
      vouchers: []
    };

    $scope.view.load = {
      cliente: {}
    };

    $scope.limpiar = function () {
      $scope.view.venta = OSVenta.$build();
      $scope.combo.selected.tipoDocumento = undefined;
      $scope.combo.selected.tipoComprobante = 'BOLETA';
      $scope.view.numeroDocumento = undefined;
      $scope.view.nombreRazonSocial = undefined;
      $scope.view.igv = 0.18;
      $scope.view.productos = [];
    };

    $scope.combo = {
      tipoComprobante: ['BOLETA', 'FACTURA'],
      tipoDocumento: undefined
    };
    $scope.combo.selected = {
      tipoComprobante: 'BOLETA',
      tipoDocumento: undefined
    };

    $scope.loadCombo = function () {
      OSTipoDocumento.$getAll().then(function (response) {
        $scope.combo.tipoDocumento = response;
      });
    };
    $scope.loadCombo();

    $scope.getTotal = function () {
      var result = 0;
      $scope.view.productos.forEach(function (row) {
        result = result + (row.cantidad * row.precio);
      });
      return result;
    };
    $scope.getIgv = function () {
      return $scope.getTotal() * $scope.view.igv;
    };
    $scope.getPrecioTotal = function () {
      return $scope.getTotal() + $scope.getIgv();
    };

    $scope.buscarCliente = function ($event) {
      if (!angular.isUndefined($event)) {
        $event.preventDefault();
      }

      if (!$scope.view.load.cliente.numeroDocumento) {
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
      }, function () {
      });
    };
    $scope.devolverProducto = function (item, $index) {
      SCDialog.confirm('Guardar', 'Estas seguro de devolver el producto?', function () {
        $scope.view.productos.splice($index, 1);
      });
    };

    $scope.save = function () {
      var venta = angular.copy($scope.view.venta);
      var detalle = [];

      venta.idCuenta = OSSession.cuenta.id;
      venta.comprobante = $scope.combo.selected.tipoComprobante;
      venta.tipoDocumento = angular.isDefined($scope.combo.selected.tipoDocumento) ? $scope.combo.selected.tipoDocumento.abreviatura : undefined;
      venta.numeroDocumento = $scope.view.numeroDocumento;
      venta.cliente = $scope.view.nombreRazonSocial;
      venta.igv = $scope.view.igv;
      venta.igvMonto = $scope.getIgv();
      venta.totalSinIgv = $scope.getTotal();
      venta.total = $scope.getPrecioTotal();

      for(var i = 0; i < $scope.view.productos.length; i++) {
        detalle[i] = {
          idProducto: $scope.view.productos[i].id,
          idAlmacen: $scope.view.productos[i].almacen.id,
          idProductoMarca: $scope.view.productos[i].marca.idProductoMarca,
          idcMarca: $scope.view.productos[i].marca.valor,
          idcUnidadMedida: $scope.view.productos[i].unidadMedida.valor,
          cantidad: $scope.view.productos[i].cantidad,
          precio: $scope.view.productos[i].precio
        };
      }
      venta.detalle = detalle;

      SCDialog.confirm('Guardar', 'Estas seguro de realizar la venta?', function () {
        $scope.working = true;
        venta.$save().then(
          function (response) {
            $scope.working = false;
            toastr.success('Venta realizada.');
            //$state.go('^.editar', {puntoVenta: response.id});
            $scope.limpiar();
            $scope.view.vouchers.push(response);
            if($scope.view.vouchers.length > 5) $scope.view.vouchers.splice(0, 1);
          },
          function error(err) {
            $scope.working = false;
            toastr.error(err.data.errorMessage);
          }
        );
      });
    };
    hotkeys.bindTo($scope).add({
      combo: 'ctrl+m',
      description: 'Realizar la venta',
      allowIn: ['INPUT'],
      callback: function(event, hotkey) {
        event.preventDefault();
        $scope.save();
      }
    });



  }
);
