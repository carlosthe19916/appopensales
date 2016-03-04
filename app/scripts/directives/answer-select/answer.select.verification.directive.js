'use strict';

/* jshint -W098 */
angular.module('forms').directive('scAnswerSelectVerification', function () {
  return {
    restrict: 'E',
    scope: {
      isRequired: '=',
      isActive: '=?',

      options: '='
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/answer-select/answer.select.verification.html',
    controller: ['$scope', function ($scope) {

    }],
    link: function (scope, element, attrs, ngModel) {
      scope.selectedEditable = [];
      scope.selectedNotEditable = [];

      function intersect(a, b) {
        var t;
        if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
        return a.filter(function (e) {
          if (b.indexOf(e) !== -1) return true;
        });
      }

      var arr_diff = function  (a1, a2) {

        var a = [], diff = [];

        for (var i = 0; i < a1.length; i++) {
          a[a1[i]] = true;
        }

        for (var i = 0; i < a2.length; i++) {
          if (a[a2[i]]) {
            delete a[a2[i]];
          } else {
            a[a2[i]] = true;
          }
        }

        for (var k in a) {
          diff.push(k);
        }

        return diff;
      };

      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function (newValue, oldValue) {
        if(newValue) {
          var options = [];
          for(var i = 0; i < scope.options.length; i++) {
            options.push(scope.options[i].denomination);
          }

          scope.selectedNotEditable = intersect(options, newValue);

          var dif = arr_diff(newValue, intersect(options, newValue));
          if(dif.length) {
            scope.selectedEditable = dif;
          }

        }
      }, true);

      scope.$watchCollection('selectedEditable', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if(!scope.selectedEditable) scope.selectedEditable = [];
          if(!scope.selectedNotEditable) scope.selectedNotEditable = [];
          var values = scope.selectedEditable.concat(scope.selectedNotEditable);
          ngModel.$setViewValue(values);
        }
      }, true);
      scope.$watchCollection('selectedNotEditable', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if(!scope.selectedEditable) scope.selectedEditable = [];
          if(!scope.selectedNotEditable) scope.selectedNotEditable = [];
          var values = scope.selectedEditable.concat(scope.selectedNotEditable);
          ngModel.$setViewValue(values);
        }
      }, true);
    }
  };
});
