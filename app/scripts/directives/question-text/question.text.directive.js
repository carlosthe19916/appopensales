'use strict';

/* jshint -W098 */
angular.module('forms').directive('scQuestionText', function () {
  return {
    restrict: 'E',
    scope: {
      isEditing: '=?'
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/question-text/question.text.html',
    controller: ['$scope', function ($scope) {
      $scope.combo = {
        type: [{name: 'TEXTO CORTO', value: 'SHORT'}, {name: 'TEXTO LARGO', value: 'LARGE'}]
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
