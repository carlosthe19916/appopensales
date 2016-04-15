'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Crear.Modal.VerProductoController',
  function ($scope, $uibModalInstance) {

    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }
);
