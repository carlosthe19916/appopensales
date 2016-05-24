'use strict';

// Configuring the Chat module
angular.module('almacen').run(['menuService',
    function (menuService) {
      menuService.addMenuItem('topbar', {
        title: 'Almacen',
        state: 'almacen.app',
        roles: ['*']
      });
    }
]);
