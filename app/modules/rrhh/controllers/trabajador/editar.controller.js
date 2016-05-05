'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Trabajador.EditarController',
  function ($scope, $state, toastr, trabajador, SCDialog) {

    $scope.view = {
      trabajador: trabajador
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
      alert('No se permite activar trabajadores, pruebe creando uno nuevo');
    };

    $scope.desactivar = function () {
      SCDialog.confirm('Guardar', 'Estas seguro de desactivar el Trabajador?', function () {
        $scope.view.trabajador.$disable().then(function (response) {
          toastr.success('Trabajador desactivado.');
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
      alert('No se permite eliminar trabajadores');
    };

  });
