'use strict';

angular.module(ApplicationConfiguration.applicationModuleName).controller('HeaderController', ['$scope', '$state', 'menuService', 'Auth', 'OSSession',
  function ($scope, $state, menuService, Auth, OSSession) {
    /*Security information*/
    $scope.user = {
      username: Auth.user.username,
      roles: Auth.user.roles
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
    $scope.menu = menuService.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });


    /*Validate session*/
    $scope.isInvalidSession = false;

    var isUndefinedOrNull = function(val) {
      return angular.isUndefined(val) || val === null
    };
    var checkRolCajero = function () {
      if(isUndefinedOrNull(OSSession.cuenta)) { $scope.isInvalidSession = true; }
      if(isUndefinedOrNull(OSSession.trabajador)) { $scope.isInvalidSession = true; }
      if(isUndefinedOrNull(OSSession.expediente)) { $scope.isInvalidSession = true; }
    };

    if(Auth.user.roles.indexOf('cajero') != -1) {
      checkRolCajero();
    }
    
  }
]);
