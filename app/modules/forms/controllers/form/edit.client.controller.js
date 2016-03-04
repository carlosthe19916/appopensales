'use strict';

/* jshint -W098 */
angular.module('forms').controller('Forms.Form.EditController',
    function ($scope, $state, toastr, form, SGDialog, SCForm) {

      $scope.view = {};
      $scope.view.form = form;

      $scope.activeForm = function () {
        SGDialog.confirm('Guardar', 'Estas seguro de activar la encuesta? Si activa la encuesta no sera capaz de anadir mas preguntas', function() {
          SCForm.$new(form.id).$active().then(
            function(response){
              toastr.success('Encuesta activada');
              $state.reload();
            },
            function error(err){
              toastr.error(err.data.errorMessage);
            }
          );
        });
      };

      $scope.remove = function () {
        SGDialog.confirmDelete(form.title, 'Encuesta', function() {
          SCForm.$new(form.id).$remove().then(
            function(response){
              toastr.success('Encuesta eliminada satisfactoriamente');
              $state.go('forms.app.form.search');
            },
            function error(err){
              toastr.error(err.data.errorMessage);
            }
          );
        });
      };

    });
