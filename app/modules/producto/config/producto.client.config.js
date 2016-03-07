'use strict';

// Configuring the Chat module
angular.module('producto').run(['Menus',
    function (Menus) {
      Menus.addMenuItem('topbar', {
        title: 'Productos',
        state: 'producto.app'
      });
    }
]);
