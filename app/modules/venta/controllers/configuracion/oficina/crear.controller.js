'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.Oficina.CrearController',
  function ($scope, $state, SCDialog, OPExpediente, toastr) {

    $scope.working = false;

    $scope.view = {
      expediente: OPExpediente.$build()
    };

    $scope.save = function () {
      SCDialog.confirm('Guardar', 'Estas seguro de crear el expediente?', function () {
        $scope.working = true;
        $scope.view.expediente.$save().then(
          function (response) {
            $scope.working = false;
            toastr.success('Expediente creadao.');
            $state.go('^.editar', {oficina: response.id});
          },
          function error(err) {
            $scope.working = false;
            toastr.error(err.data.message);
          }
        );
      });
    };

  }
);
