'use strict';

/* jshint -W098 */
angular.module('forms').directive('scQuestionScale', function () {
  return {
    restrict: 'E',
    scope: {
      isEditing: '=?'
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/question-scale/question.scale.html',
    controller: ['$scope', function ($scope) {
      $scope.range = function(min, max, step){
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) input.push(i);
        return input;
      };
    }],
    link: function (scope, element, attrs, ngModel) {
      scope.question = {};

      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function (newValue, oldValue) {
        scope.question = newValue;
      }, true);

      scope.$watch('question', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          ngModel.$setViewValue(newVal);
        }
      }, true);

    }
  };
});
