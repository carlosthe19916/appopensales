'use strict';

// Configuring the Chat module
angular.module('persona').run(['menuService',
  function (menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Persona',
      state: 'persona.app',
      roles: ['*']
    });
  }
]);
