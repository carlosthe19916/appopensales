'use strict';

/* jshint -W098 */
angular.module('forms').directive('scAnswerSelectDropdown', function () {
  return {
    restrict: 'E',
    scope: {
      isRequired: '=',
      isActive: '=?',

      options: '='
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/answer-select/answer.select.dropdown.html',
    controller: ['$scope', function ($scope) {

    }],
    link: function (scope, element, attrs, ngModel) {
      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function (newValue, oldValue) {
        if(newValue) {
          scope.selected = newValue[0];
        }
      }, true);

      scope.$watchCollection('selected', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          ngModel.$setViewValue([scope.selected]);
        }
      }, true);
    }
  };
});
