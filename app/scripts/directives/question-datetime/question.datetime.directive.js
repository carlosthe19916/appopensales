'use strict';

/* jshint -W098 */
angular.module('forms').directive('scQuestionDatetime', function () {
  return {
    restrict: 'E',
    scope: {
      isEditing: '=?'
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/question-datetime/question.datetime.html',
    controller: ['$scope', function ($scope) {
      $scope.combo = {
        type: [
          {name: 'FECHA', value: 'DATE'},
          {name: 'HORA', value: 'TIME'},
          {name: 'FECHA Y HORA', value: 'DATETIME'}
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
