'use strict';

/* jshint -W098 */
angular.module('forms').directive('scAnswer', function () {
  return {
    restrict: 'E',
    scope: {
      question: '=',
      isActive: '=?'
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/answer/answer.html',
    controller: ['$scope', function ($scope) {

    }],
    link: function (scope, element, attrs, ngModel) {
      scope.answer = {};

      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function (newValue, oldValue) {
        scope.answer = newValue;
      }, true);

      scope.$watch('answer', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          ngModel.$setViewValue(newVal);
        }
      }, true);

    }
  };
});
