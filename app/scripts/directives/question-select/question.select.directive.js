'use strict';

/* jshint -W098 */
angular.module('forms').directive('scQuestionSelect', function () {
  return {
    restrict: 'E',
    scope: {
      isEditing: '=?'
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/question-select/question.select.html',
    controller: ['$scope', function ($scope) {

      $scope.combo = {
        type: [
          {name: 'MULTIPLE', value: 'MULTIPLE'},
          {name: 'VERIFICACION', value: 'VERIFICATION'},
          {name: 'DESPLEGABLE', value: 'DROPDOWN'}
        ]
      };

      // Functions to add and remove element
      $scope.addElement = function () {
        if (!$scope.question.selectOptions) $scope.question.selectOptions = [];
        var elementNumber = $scope.question.selectOptions.length + 1;
        $scope.question.selectOptions.push({
          id: undefined,
          number: elementNumber,
          denomination: 'Opcion' + elementNumber,
          editable: false
        });
      };
      $scope.addEditableElement = function () {
        if (!$scope.question.selectOptions) $scope.question.selectOptions = [];
        var elementNumber = $scope.question.selectOptions.length + 1;
        $scope.question.selectOptions.push({id: undefined, number: elementNumber, denomination: 'Otro', editable: true});
      };
      $scope.removeElement = function (index) {
        $scope.question.selectOptions.splice(index, 1);
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
