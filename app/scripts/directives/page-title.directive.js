'use strict';

// Directives for common buttons
angular.module(ApplicationConfiguration.applicationModuleName).directive('pageTitle', function ($rootScope, $timeout, $interpolate, $state) {

  var directive = {
    retrict: 'A',
    link: link
  };

  return directive;

  function link(scope, element) {
    $rootScope.$on('$stateChangeSuccess', listener);

    function listener(event, toState) {
      var title = (getTitle($state.$current));
      $timeout(function () {
        element.text(title);
      }, 0, false);
    }

    function getTitle(currentState) {
      var applicationCoreTitle = 'Opensales';
      var workingState = currentState;
      if (currentState.data) {
        workingState = (typeof workingState.locals !== 'undefined') ? workingState.locals.globals : workingState;
        var stateTitle = $interpolate(currentState.data.pageTitle)(workingState);
        return applicationCoreTitle + ' - ' + stateTitle;
      } else {
        return applicationCoreTitle;
      }
    }
  }

});

