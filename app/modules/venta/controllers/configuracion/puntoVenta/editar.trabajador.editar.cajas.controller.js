'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Trabajador.Editar.CajasController',
  function ($scope, $state, toastr, puntoVenta, trabajador, SCDialog, OSCaja) {

    $scope.view = {
      trabajador: trabajador
    };

    $scope.combo = {
      cajaDisponible: [],
      cajaAsignada: []
    };
    $scope.combo.selected = {
      cajaDisponible: [],
      cajaAsignada: []
    };

    $scope.loadCombo = function () {
      $scope.combo.cajaDisponible = puntoVenta.OSCaja().$getAll({estado: true}).$object;
      $scope.combo.cajaAsignada = $scope.view.trabajador.OSCaja().$getAll({estado: true}).$object;
    };
    $scope.loadCombo();

    $scope.orderCombo = function () {
      for (var i = 0; i < $scope.combo.cajaDisponible.length; i++) {
        for (var j = 0; j < $scope.combo.cajaAsignada.length; j++) {
          if(!$scope.combo.cajaDisponible[i]){
            break;
          }
          if ($scope.combo.cajaDisponible[i].id === $scope.combo.cajaAsignada[j].id) {
            $scope.combo.cajaDisponible.splice(i, 1);
          }
        }
      }
    };

    $scope.$watch('combo.cajaDisponible', function (newVal, oldVal) {
      if (newVal.length) {
        $scope.orderCombo();
      }
    }, true);
    $scope.$watch('combo.cajaAsignada', function (newVal, oldVal) {
      if (newVal.length) {
        $scope.orderCombo();
      }
    }, true);

    $scope.addCajas = function () {
      if ($scope.view.trabajador.estado === false) {
        toastr.info('Trabajador inactivo, no se puede actualizar.');
        return;
      }

      SCDialog.confirm('Guardar', 'Estas seguro de vincular la(s) cajas al trabajador', function () {

        var cajas = [];
        for (var i = 0; i < $scope.combo.selected.cajaDisponible.length; i++) {
          cajas.push({
            id: $scope.combo.selected.cajaDisponible[i].id,
            denominacion: $scope.combo.selected.cajaDisponible[i].denominacion
          });
        }

        $scope.view.trabajador.OSCaja().$saveSent(cajas).then(
          function (response) {
            toastr.success('Cajas asignadas');
            var nuevoCaja = [];
            for (var i = 0; i < $scope.combo.selected.cajaDisponible.length; i++) {
              nuevoCaja.push({
                id: $scope.combo.selected.cajaDisponible[i].id,
                denominacion: $scope.combo.selected.cajaDisponible[i].denominacion,
                abreviatura: $scope.combo.selected.cajaDisponible[i].abreviatura
              });
            }
            $scope.combo.cajaAsignada = $scope.combo.cajaAsignada.concat(nuevoCaja);
          },
          function error(err) {
            toastr.error(err.data.message);
          }
        );
      });
    };

  }
);
