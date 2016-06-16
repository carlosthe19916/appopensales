'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.PuntoVenta.Trabajador.CrearController',
  function ($scope, $state, toastr, puntoVenta, SCDialog, OSTrabajador, OSTipoDocumento, OSPersona) {

    $scope.working = false;

    $scope.view = {
      trabajador: OSTrabajador.$build()
    };

    $scope.view.loaded = {
      persona: undefined,
      trabajador: undefined
    };

    $scope.combo = {
      puntoVenta: undefined,
      tipoDocumento: undefined
    };
    $scope.combo.selected = {
      //direccionRegional: DIRECCION_REGIONAL ? DIRECCION_REGIONAL : undefined,
      puntoVenta: puntoVenta,
      tipoDocumento: undefined
    };

    $scope.loadCombo = function () {
      OSTipoDocumento.$getAll({tipoPersona: 'NATURAL'}).then(function (response) {
        $scope.combo.tipoDocumento = response;
      });

      /*if ($scope.access.administrarTrabajadores) {
        SGDireccionRegional.$getAll().then(function(response){
          $scope.combo.direccionRegional = response;
        });
      } else if ($scope.access.administrarTrabajadoresDireccionRegional) {
        $scope.combo.direccionRegional = [DIRECCION_REGIONAL];
      } else {
        console.log('User not authenticated for this action.');
      }*/
    };
    $scope.loadCombo();

    $scope.check = function ($event) {
      if (!angular.isUndefined($event)) {
        $event.preventDefault();
      }
      if(!$scope.combo.selected.tipoDocumento || !$scope.view.trabajador.numeroDocumento || $scope.view.trabajador.numeroDocumento.length == 0) {
        return;
      }

      var criteria1 = {
        tipoDocumento: $scope.combo.selected.tipoDocumento.id,
        numeroDocumento: $scope.view.trabajador.numeroDocumento
      };
      var criteria2 = {
        tipoDocumento: $scope.combo.selected.tipoDocumento.id,
        numeroDocumento: $scope.view.trabajador.numeroDocumento
      };

      OSPersona.$getAll(criteria1).then(function (response) {
        $scope.view.loaded.persona = response[0];
        if ($scope.view.loaded.persona) {
          toastr.info('Persona encontrada');
        } else {
          toastr.warning('Persona no encontrada');
        }
      });

      OSTrabajador.$getAll(criteria2).then(function (response) {
        $scope.view.loaded.trabajador = response[0];
        if ($scope.view.loaded.trabajador) {
          toastr.warning('Trabajador encontrado para la persona');
        }
      });
    };

    $scope.save = function () {
      if (angular.isUndefined($scope.view.loaded.persona)) {
        toastr.warning('Debe de seleccionar una persona.');
        return;
      }
      if (angular.isDefined($scope.view.loaded.trabajador)) {
        toastr.warning('El trabajador ya fue registrado en algun punto de venta, no puede continuar.');
        return;
      }

      var trabajador = angular.copy($scope.view.trabajador);
      trabajador.idPersona = $scope.view.loaded.persona.id;
      trabajador.idExpediente = puntoVenta.id;

      SCDialog.confirm('Guardar', 'Estas seguro de crear el trabajador?', function () {
        $scope.working = true;
        trabajador.$save().then(
          function (response) {
            toastr.success('Trabajador creado');
            $scope.working = false;
            $state.go('^.editar', {trabajador: response.id});
          },
          function error(err) {
            $scope.working = false;
            toastr.error(err.data.errorMessage);
          }
        );
      });

    };

  }
);
