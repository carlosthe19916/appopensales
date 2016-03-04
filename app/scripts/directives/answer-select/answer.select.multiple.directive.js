'use strict';

/* jshint -W098 */
angular.module('forms').directive('scAnswerSelectMultiple', function () {
  return {
    restrict: 'E',
    scope: {
      isRequired: '=',
      isActive: '=?',

      options: '='
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/answer-select/answer.select.multiple.html',
    controller: ['$scope', function ($scope) {

    }],
    link: function (scope, element, attrs, ngModel) {

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

          scope.selectedNotEditable = intersect(options, newValue)[0];

          var dif = arr_diff(newValue, intersect(options, newValue));
          if(dif.length) {
            scope.selectedEditable = dif[0];
          }

        }
      }, true);

      scope.$watchCollection('selectedNotEditable', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          ngModel.$setViewValue([scope.selectedNotEditable]);
        }
      }, true);
      scope.$watchCollection('selectedEditable', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          scope.selectedNotEditable = undefined;
          ngModel.$setViewValue([scope.selectedEditable]);
        }
      }, true);

    }
  };
});
