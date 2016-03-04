'use strict';

/* jshint -W098 */
angular.module('forms').directive('scAnswerGrid', function () {
  return {
    restrict: 'E',
    scope: {

    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/answer-grid/answer.grid.html',
    controller: ['$scope', function ($scope) {

    }],
    link: function (scope, element, attrs, ngModel) {

    }
  };
});
