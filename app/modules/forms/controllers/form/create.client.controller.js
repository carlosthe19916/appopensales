'use strict';

/* jshint -W098 */
angular.module('forms').controller('Forms.Form.CreateController',
    function ($scope, $state, toastr, SGDialog, SCForm) {

      $scope.working = false;

      $scope.view = {};
      $scope.view.form = SCForm.$build();

      $scope.save = function(){
        SGDialog.confirm('Guardar', 'Estas seguro que quieres crear la encuesta?', function(){
          $scope.working = true;
          $scope.view.form.$save().then(
            function (response) {
              $scope.working = false;
              toastr.success('Encuesta creada satisfactoriamente');
              $state.go('^.edit', {form: response.id});
            },
            function error(err){
              $scope.working = false;
              toastr.error(err.data.errorMessage);
            }
          );
        });
      };

    });
