'use strict';

/* jshint -W098 */
angular.module('forms').directive('scAnswerSelect', function () {
  return {
    restrict: 'E',
    scope: {
      type: '=',
      isRequired: '=',
      isActive: '=?',

      options: '='
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/answer-select/answer.select.html',
    controller: ['$scope', function ($scope) {

    }],
    link: function (scope, element, attrs, ngModel) {
      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function (newValue, oldValue) {
        if(newValue) {
          scope.selected = newValue;
        }
      }, true);

      scope.$watchCollection('selected', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if(!scope.selected) scope.selected = [];
          ngModel.$setViewValue(scope.selected);
        }
      }, true);
    }
  };
});
