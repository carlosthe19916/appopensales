'use strict';

/* jshint -W098 */
angular.module('forms').directive('scAnswerDatetime', function () {
  return {
    restrict: 'E',
    scope: {
      type: '=',
      isRequired: '=',
      isActive: '=?'
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/answer-datetime/answer.datetime.html',
    controller: ['$scope', function ($scope) {
      $scope.date;
      $scope.time;
    }],
    link: function (scope, element, attrs, ngModel) {

      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function (newValue, oldValue) {
        if(newValue) {
          scope.date = new Date(newValue);
          scope.time = new Date(newValue);
        }
      }, true);

      scope.$watch('date', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          var date = newVal;
          if(scope.time) {
            date.setHours(scope.time.getHours());
            date.setMinutes(scope.time.getMinutes());
          }

          ngModel.$setViewValue(date);
          ngModel.$render();
        }
      }, true);
      scope.$watch('time', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if(!scope.date) {
            scope.date = new Date();
          }
          var date = scope.date;
          date.setHours(scope.time.getHours());
          date.setMinutes(scope.time.getMinutes());

          ngModel.$setViewValue(date);
          ngModel.$render();
        }
      }, true);

    }
  };
});
