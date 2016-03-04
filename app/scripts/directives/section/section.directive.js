'use strict';

/* jshint -W098 */
angular.module('forms').directive('scSection', function () {
  return {
    restrict: 'E',
    scope: {
      isEditing: '=?'
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/section/section.html',
    controller: ['$scope', function ($scope) {

    }],
    link: function (scope, element, attrs, ngModel) {
      scope.section = {};

      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function (newValue, oldValue) {
        scope.section = newValue;
      }, true);

      scope.$watch('section', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          ngModel.$setViewValue(newVal);
        }
      }, true);

    }
  };
});
