'use strict';

/* jshint -W098 */
angular.module('almacen').controller('AlmacenController', ['$scope',
  function ($scope) {

    $scope.package = {
      name: 'almacen'
    };

    // Collapsing the menu after navigation
    $scope.isSidebarCollapsed = false;
    $scope.toggleCollapsibleSidebarMenu = function () {
      $scope.isSidebarCollapsed = !$scope.isSidebarCollapsed;
    };

  }
]);
