'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Caja.AbrirController',
  function ($scope, $state, toastr, SCDialog, OSSession, OSCaja) {

    console.log(OSSession);

    $scope.working = false;

    $scope.view = {
      caja: OSCaja.$find(OSSession.cuenta.id).$object
    };

    $scope.view.load = {
      historial: undefined,
      detalle: undefined,
      detalleDefecto: [
        {denominacion: 0.10, cantidad: 0},
        {denominacion: 0.20, cantidad: 0},
        {denominacion: 0.50, cantidad: 0},
        {denominacion: 1.00, cantidad: 0},
        {denominacion: 2.00, cantidad: 0},
        {denominacion: 5.00, cantidad: 0},
        {denominacion: 10.00, cantidad: 0},
        {denominacion: 20.00, cantidad: 0},
        {denominacion: 50.00, cantidad: 0},
        {denominacion: 100.00, cantidad: 0},
        {denominacion: 200.00, cantidad: 0}
      ]
    };

    $scope.loadHistorialActivo = function () {
      OSCaja.$new(OSSession.cuenta.id).OSCajaHistorialApertura().$getAll({estado: true}).then(function (response) {
        $scope.view.load.historial = response[0];
        if(response[0]) {
          if($scope.view.load.historial.fechaApertura) $scope.view.load.historial.fechaApertura = new Date($scope.view.load.historial.fechaApertura);
          if($scope.view.load.historial.fechaCierre) $scope.view.load.historial.fechaCierre = new Date($scope.view.load.historial.fechaCierre);
        }

        function addSubtotal(data) {
          angular.forEach(data, function (row) {
            row.subtotal = function () {
              return this.denominacion * this.cantidad;
            };
          });
        }
        //Load detalle de historial
        if(!$scope.view.load.historial) {
          addSubtotal($scope.view.load.detalle);
          $scope.view.load.detalle = $scope.view.load.detalleDefecto;
        }
        else {
          addSubtotal($scope.view.load.historial.detalle);
          $scope.view.load.detalle = $scope.view.load.historial.detalle;
        }
      });
    };
    $scope.loadHistorialActivo();

    $scope.save = function() {
      if(!$scope.view.caja.estado || $scope.view.caja.estado == false || $scope.view.caja.estado == "0") {
        toastr.warning('Caja inactiva, no puede ser abierta');
        return;
      }
      if($scope.view.caja.abierto == true || $scope.view.caja.abierto == "1") {
        toastr.warning('Caja ya fue abierta, no puede abrirla nuevamente');
        return;
      }

      SCDialog.confirm('Guardar', 'Estas seguro de abrir la caja?', function () {
        $scope.working = true;
        OSCaja.$new(OSSession.cuenta.id).$abrir($scope.view.load.detalle).then(
          function (response) {
            $scope.working = false;
            OSSession.cuenta.abierto = true;
            toastr.success('Caja abierta.');
            $state.go('venta.app.operaciones.venta');
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
