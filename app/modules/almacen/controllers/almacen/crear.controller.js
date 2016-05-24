'use strict';

/* jshint -W098 */
angular.module('almacen').controller('Almacen.Almacen.CrearController',
  function ($scope, $state, SCDialog, OSPuntoVenta, OSAlmacen, toastr) {

    $scope.working = false;

    $scope.view = {
      almacen: OSAlmacen.$build()
    };

    $scope.combo = function () {
      puntoVenta: undefined
    };
    $scope.combo.selected = function () {
      $scope.puntoVenta = undefined
    };

    $scope.loadCombo = function () {
      OSPuntoVenta.$getAll({estado: true}).then(function (response) {
        $scope.combo.puntoVenta = response;
      });
    };
    $scope.loadCombo();

    $scope.save = function () {
      SCDialog.confirm('Guardar', 'Estas seguro de crear el almacen?', function () {
        $scope.working = true;
        $scope.view.almacen.expediente = {id: $scope.combo.selected.puntoVenta.id};
        $scope.view.almacen.$save().then(
          function (response) {
            $scope.working = false;
            toastr.success('Almacen creado.');
            $state.go('^.editar', {almacen: response.id});
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
