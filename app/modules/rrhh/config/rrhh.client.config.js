'use strict';

// Configuring the Chat module
angular.module('rrhh').run(['menuService',
    function (menuService) {
      menuService.addMenuItem('topbar', {
        title: 'Rrhh',
        state: 'rrhh.app',
        roles: ['*']
      });
    }
]);
