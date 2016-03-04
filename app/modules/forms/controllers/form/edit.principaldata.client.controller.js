'use strict';

/* jshint -W098 */
angular.module('forms').controller('Forms.Form.Edit.PrincipalDataController',
  function ($scope, $state, toastr, form) {

    $scope.working = false;

    $scope.view = {};
    $scope.view.form = form;

    $scope.save = function () {
      $scope.working = true;
      $scope.view.form.$save().then(
        function (response) {
          $scope.working = false;
          toastr.success('Encuesta actualizada satisfactoriamente');
        },
        function error(err) {
          $scope.working = false;
          toastr.error(err.data.errorMessage);
        }
      );
    };

  });
