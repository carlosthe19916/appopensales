'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Editar.ResumenController',
  function ($scope, $state, toastr, puntoVenta, SCDialog, OSCaja) {

    $scope.view = {
      puntoVenta: puntoVenta
    };

    $scope.view.load = {
      cajas: []
    };

    $scope.loadCajas = function () {
      $scope.view.puntoVenta.OPCaja().$getAll({estado: true}).then(function (response) {
        $scope.view.load.cajas = response;
      });
    };
    $scope.loadCajas();

    $scope.editCaja = function (row) {
        $state.go('^.cajas.editar', {caja: row.id});
    };
    $scope.removeCaja = function (row, index) {
      SCDialog.confirmDelete(row.denominacion, 'Caja', function(){
        OSCaja.$new(row.id).$remove().then(
          function (response) {
            toastr.success('Caja eliminada.');
            $scope.view.load.cajas.splice(index, 1);
          },
          function error(err) {
            toastr.error(err.data.message);
          }
        );
      });
    };

  }
);
