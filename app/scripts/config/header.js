'use strict';

angular.module(ApplicationConfiguration.applicationModuleName).controller('HeaderController', ['$scope', '$state', 'Menus', 'Auth',
  function ($scope, $state, Menus, Auth) {

    /*Security information*/
    $scope.user = {
      username: Auth.user.username,
      roles: Auth.roles
    };
    $scope.logout = function () {
      Auth.authz.logout();
    };
    $scope.accountManagement = function () {
      Auth.authz.accountManagement();
    };

    // Expose view variables
    $scope.$state = $state;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });

  }
]);
