'use strict';

// Configuring the Chat module
angular.module('venta').run(['Menus',
    function (Menus) {
      Menus.addMenuItem('topbar', {
        title: 'Ventas',
        state: 'venta.app'
      });
    }
]);
