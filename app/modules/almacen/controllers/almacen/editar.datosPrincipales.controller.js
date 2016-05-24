'use strict';

/* jshint -W098 */
angular.module('almacen').controller('Almacen.Almacen.Editar.DatosPrincipalesController',
  function ($scope, $state, toastr, almacen, SCDialog) {

    $scope.working = false;

    $scope.view = {
      almacen: almacen
    };

    $scope.save = function() {
      $scope.working = true;
      $scope.view.almacen.$save().then(
        function (response) {
          $scope.working = false;
          toastr.success('Almacen actualizado.');
        },
        function error(err) {
          $scope.working = false;
          toastr.error(err.data.errorMessage);
        }
      );
    };

  });
