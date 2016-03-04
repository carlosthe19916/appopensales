'use strict';

/* jshint -W098 */
angular.module('forms').directive('scAnswerScale', function () {
  return {
    restrict: 'E',
    scope: {
      isRequired: '=',
      isActive: '=?',

      min: '=',
      max: '=',
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/answer-scale/answer.scale.html',
    controller: ['$scope', function ($scope) {
      $scope.range = function(min, max, step){
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) input.push(i);
        return input;
      };
    }],
    link: function (scope, element, attrs, ngModel) {
      scope.answer;

      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function (newValue, oldValue) {
        scope.answer = newValue;
      }, true);

      scope.$watch('answer', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          ngModel.$setViewValue(newVal);
          ngModel.$render();
        }
      }, true);
    }
  };
});
