'use strict';

// Setting up route
angular.module(ApplicationConfiguration.applicationModuleName).config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    // Home state routing
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html'
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: '404.html',
        data: {
          ignoreState: true,
          pageTitle: 'Not-Found'
        }
      })
      .state('bad-request', {
        url: '/bad-request',
        templateUrl: '400.html',
        data: {
          ignoreState: true,
          pageTitle: 'Bad-Request'
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: '403.html',
        data: {
          ignoreState: true,
          pageTitle: 'Forbidden'
        }
      })

      .state('account-info', {
        url: '/account-info',
        templateUrl: 'account-info.html',
        controller: 'AccountInfoController'
      })
      .state('server-info', {
        url: '/server-info',
        templateUrl: 'server-info.html',
        controller: 'ServerInfoController'
      })
      .state('config-printer', {
        url: '/config-printer',
        templateUrl: 'views/config-printer.html',
        controller: 'ConfigPrinterController'
      });

  }
]);
