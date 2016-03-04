'use strict';

/* jshint -W098 */
angular.module('forms').directive('scQuestionGridElements', function() {
  return {
    restrict: 'E',
    scope: {
      type: '=?',
      isEditing: '=?'
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/question-grid/question.grid.elements.html',
    controller: ['$scope', function ($scope) {
      // Functions to add and remove element
      $scope.addElement = function (editable) {
        if (!$scope.elements) $scope.elements = [];
        var elementNumber = $scope.elements.length + 1;
        $scope.elements.push({
          id: undefined,
          number: elementNumber,
          denomination: ($scope.type || 'Elemento') + ' ' + elementNumber,
          editable: editable || false
        });
      };
      $scope.addEditableElement = function () {
        addElement(true);
      };
      $scope.removeElement = function (index) {
        $scope.elements.splice(index, 1);
      };
    }],
    link: function (scope, element, attrs, ngModel) {
      scope.elements = [];

      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function (newValue, oldValue) {
        scope.elements = newValue;
      }, true);

      scope.$watch('elements', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          ngModel.$setViewValue(newVal);
        }
      }, true);

    }
  };
});
