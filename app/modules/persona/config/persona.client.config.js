'use strict';

// Configuring the Chat module
angular.module('persona').run(['Menus',
    function (Menus) {
      Menus.addMenuItem('topbar', {
        title: 'Persona',
        state: 'persona.app'
      });
    }
]);
