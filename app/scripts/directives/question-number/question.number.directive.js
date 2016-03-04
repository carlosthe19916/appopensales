'use strict';

/* jshint -W098 */
angular.module('forms').directive('scQuestionNumber', function () {
  return {
    restrict: 'E',
    scope: {
      isEditing: '=?'
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/question-number/question.number.html',
    controller: ['$scope', function ($scope) {
      $scope.combo = {
        type: [
          {name: 'ENTERO', value: 'INTEGER'},
          {name: 'DECIMAL', value: 'DECIMAL'}
        ]
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
