'use strict';

// Directives for common buttons
angular.module(ApplicationConfiguration.applicationModuleName)
  .directive('osReadOnly', function () {
    var disabled = {};

    var d = {
      replace : false,
      link : function(scope, element, attrs) {
        var disable = function(i, e) {
          if (!e.disabled) {
            disabled[e.tagName + i] = true;
            e.disabled = true;
          }
        };

        var enable = function(i, e) {
          if (disabled[e.tagName + i]) {
            e.disabled = false;
            delete disabled[i];
          }
        };

        scope.$watch(attrs.osReadOnly, function(readOnly) {
          if (readOnly) {
            element.find('input').each(disable);
            element.find('button').each(disable);
            element.find('select').each(disable);
            element.find('textarea').each(disable);
          } else {
            element.find('input').each(enable);
            element.find('input').each(enable);
            element.find('button').each(enable);
            element.find('select').each(enable);
            element.find('textarea').each(enable);
          }
        });
      }
    };
    return d;
  });
