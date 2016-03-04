'use strict';

// Directives for common buttons
angular.module(ApplicationConfiguration.applicationModuleName).config(function ($provide) {

  $provide.decorator('uibDatepickerPopupDirective', function ($delegate) {
    var directive = $delegate[0];
    var link = directive.link;

    directive.compile = function () {
      return function (scope, element, attrs) {
        link.apply(this, arguments);
        element.mask("99/99/9999");
      };
    };

    return $delegate;
  });

});
