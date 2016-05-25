'use strict';

/* jshint -W098 */
angular.module('almacen').controller('Almacen.Producto.CrearController',
  function ($scope, $state, SCDialog, OSCombo, OSProducto, toastr) {

    $scope.working = false;

    $scope.view = {
      producto: OSProducto.$build()
    };

    $scope.combo = {
      clase: undefined,
      categoria: undefined,
      grupo: undefined
    };
    $scope.combo.selected = {
      clase: undefined,
      categoria: undefined,
      grupo: undefined
    };

    $scope.loadCombo = function () {
      OSCombo.$getClasesProducto().then(function (response) {
        $scope.combo.clase = response;
      });
      OSCombo.$getCategoriasProducto().then(function (response) {
        $scope.combo.categoria = response;
      });
      OSCombo.$getGruposProducto().then(function (response) {
        $scope.combo.grupo = response;
      });
    };
    $scope.loadCombo();

    $scope.save = function () {
      SCDialog.confirm('Guardar', 'Estas seguro de crear el producto?', function () {
        $scope.working = true;

        $scope.view.producto.clase = {id: $scope.combo.selected.clase.id};
        $scope.view.producto.categoria = {id: $scope.combo.selected.categoria.id};
        $scope.view.producto.grupo = {id: $scope.combo.selected.grupo.id};

        $scope.view.producto.$save().then(
          function (response) {
            $scope.working = false;
            toastr.success('Producto creado.');
            $state.go('^.editar', {producto: response.id});
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
