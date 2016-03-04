'use strict';

// Directives for common buttons
angular.module(ApplicationConfiguration.applicationModuleName).directive('scSidebarResize', function ($window) {
  return function (scope, element) {
    function resize() {
      var navBar = angular.element(document.getElementsByClassName('navbar-pf')).height();
      var container = angular.element(document.getElementById('view').getElementsByTagName('div')[0]).height();
      var height = Math.max(container, window.innerHeight - navBar - 3);

      element[0].style['min-height'] = height + 'px';
    }

    resize();

    var w = angular.element($window);
    scope.$watch(function () {
      return {
        'h': window.innerHeight,
        'w': window.innerWidth
      };
    }, function () {
      resize();
    }, true);
    w.bind('resize', function () {
      scope.$apply();
    });
  }
});

