'use strict';

// Configuring the Chat module
angular.module('venta').run(['menuService',
    function (menuService) {
      menuService.addMenuItem('topbar', {
        title: 'Ventas',
        state: 'venta.app',
        roles: ['admin', 'cajero']
      });
    }
]);
