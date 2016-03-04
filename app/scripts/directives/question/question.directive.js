'use strict';

/* jshint -W098 */
angular.module('forms').directive('scQuestion', function () {
  return {
    restrict: 'E',
    scope: {
      isEditing: '=?'
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/question/question.html',
    controller: ['$scope', function ($scope) {
      $scope.combo = {
        type: [
          {name: 'TEXTO', value: 'TEXT'},
          {name: 'NUMERO', value: 'NUMBER'},
          {name: 'FECHA Y/O HORA', value: 'DATETIME'},
          {name: 'OPCIONES', value: 'SELECT'},
          {name: 'ESCALA', value: 'SCALE'},
          {name: 'TABLA', value: 'GRID'}
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
