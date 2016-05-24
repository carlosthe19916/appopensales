'use strict';

/* jshint -W098 */
angular.module('almacen').controller('Almacen.Almacen.EditarController',
  function ($scope, $state, toastr, almacen, SCDialog) {

    $scope.view = {
      almacen: almacen
    };

    $scope.activar = function () {
      /*SCDialog.confirm('Guardar', 'Estas seguro de activar el Trabajador?', function () {
        $scope.view.trabajador.$enable().then(function (response) {
          toastr.success('Trabajador activado.');
          $state.reload();
        }, function error(err) {
          toastr.error(err.data.errorMessage);
        });
      });*/
      alert('No se permite activar almacenes, pruebe creando uno nuevo');
    };

    $scope.desactivar = function () {
      SCDialog.confirm('Guardar', 'Estas seguro de desactivar el Almacen?', function () {
        $scope.view.almacen.$disable().then(function (response) {
          toastr.success('Almacen desactivado.');
          $state.reload();
        }, function error(err) {
          toastr.error(err.data.errorMessage);
        });
      });
    };

    $scope.remove = function () {
      /*SCDialog.confirmDelete($scope.view.trabajador.nombres + ' ' + $scope.view.trabajador.apellidoPaterno, 'Trabajador', function () {
        $scope.view.trabajador.$remove().then(function (response) {
          toastr.success('Trabajador eliminado.');
          $state.go('^.^.buscar');
        }, function error(err) {
          toastr.error(err.data.errorMessage);
        });
      });*/
      alert('No se permite eliminar almacenes');
    };

  });
