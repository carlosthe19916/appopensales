'use strict';

// Configuring the Chat module
angular.module('producto').run(['menuService',
    function (menuService) {
      menuService.addMenuItem('topbar', {
        title: 'Productos',
        state: 'producto.app',
        roles: ['*']
      });
    }
]);
