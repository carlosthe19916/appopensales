'use strict';

// Configuring the Chat module
angular.module('almacen').run(['Menus',
    function (Menus) {
      Menus.addMenuItem('topbar', {
        title: 'Almacen',
        state: 'almacen.app'
      });
    }
]);
