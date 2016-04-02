'use strict';

/* jshint -W098 */
angular.module('venta').controller('VentaController', ['$scope',
  function ($scope) {

    $scope.package = {
      name: 'venta'
    };

    // Collapsing the menu after navigation
    $scope.isSidebarCollapsed = false;
    $scope.toggleCollapsibleSidebarMenu = function () {
      $scope.isSidebarCollapsed = !$scope.isSidebarCollapsed;
    };

  }
]);
