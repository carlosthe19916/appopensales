'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Caja.CerrarController',
  function ($scope, $state, toastr, SCDialog, OSCaja, OSSession) {

    $scope.working = false;

    $scope.view = {
      caja: OSCaja.$find(OSSession.cuenta.id).$object
    };

    $scope.view.load = {
      historial: undefined,
      detalle: undefined
    };

    $scope.loadHistorialActivo = function () {
      OSCaja.$new(OSSession.cuenta.id).OSCajaHistorialApertura().$getAll({estado: true}).then(function (response) {
        $scope.view.load.historial = response[0];
        if(response[0]) {
          if($scope.view.load.historial.fechaApertura) $scope.view.load.historial.fechaApertura = new Date($scope.view.load.historial.fechaApertura);
          $scope.view.load.historial.fechaCierre = new Date();
        }

        function addSubtotal(data) {
          angular.forEach(data, function (row) {
            row.subtotal = function () {
              return this.denominacion * this.cantidad;
            };
          });
        }
        addSubtotal($scope.view.load.historial.detalle);
        $scope.view.load.detalle = $scope.view.load.historial.detalle;
      });
    };
    $scope.loadHistorialActivo();

    $scope.getTotal = function (detalle) {
      var total = 0;
      if (detalle) {
        for (var i = 0; i < detalle.length; i++) {
          total = total + (detalle[i].denominacion * detalle[i].cantidad);
        }
      }
      return total;
    };

    $scope.save = function() {
      if(!$scope.view.caja.estado || $scope.view.caja.estado == false || $scope.view.caja.estado == "0") {
        toastr.warning('Caja inactiva, no puede ser cerrada');
        return;
      }
      if($scope.view.caja.abierto == false || $scope.view.caja.abierto == "0") {
        toastr.warning('Caja cerrada, no puede cerrarlo nuevamente');
        return;
      }

      SCDialog.confirm('Guardar', 'Estas seguro de cerrar la caja?', function () {
        $scope.working = true;
        OSCaja.$new(OSSession.cuenta.id).$cerrar($scope.view.load.detalle).then(
          function (response) {
            $scope.working = false;
            OSSession.cuenta.abierto = false;
            toastr.success('Caja cerrada.');
            $state.go('venta.app.configuracion.puntoVenta.buscar');
          },
          function error(err) {
            $scope.working = false;
            toastr.error(err.data.errorMessage);
          }
        );
      });
    };

  }
);
