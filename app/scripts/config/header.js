'use strict';

angular.module(ApplicationConfiguration.applicationModuleName).controller('HeaderController', ['$scope', '$state', 'Auth',
  function ($scope, $state, Auth) {

    $scope.user = {
      username: Auth.authz.idTokenParsed.preferred_username,
      roles: []
    };
    $scope.logout = function () {
      Auth.authz.logout();
    };
    $scope.accountManagement = function () {
      Auth.authz.accountManagement();
    };
    var loadRoles = function () {
      if (!angular.isUndefined(Auth.authz.realmAccess)) {
        var realmRoles = Auth.authz.realmAccess.roles;
        for (var i = 0; i < realmRoles.length; i++) {
          $scope.user.roles.push(realmRoles[i]);
        }
      }
    };
    loadRoles();

    // Expose view variables
    $scope.$state = $state;

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
