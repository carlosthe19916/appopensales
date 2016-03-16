'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.Oficina.CrearController',
  function ($scope, $state, SCDialog, OSOFicina, toastr) {

    $scope.working = false;

    $scope.view = {
      oficina: OSOFicina.$build()
    };

    $scope.save = function () {
      SCDialog.confirm('Guardar', 'Estas seguro de crear la oficina?', function () {
        $scope.working = true;
        $scope.view.oficina.$save().then(
          function (response) {
            $scope.working = false;
            toastr.success('Oficina creada.');
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
