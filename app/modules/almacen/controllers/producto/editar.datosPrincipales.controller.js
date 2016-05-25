'use strict';

/* jshint -W098 */
angular.module('almacen').controller('Almacen.Producto.Editar.DatosPrincipalesController',
  function ($scope, $state, toastr, producto, OSCombo) {

    $scope.working = false;

    $scope.view = {
      producto: producto
    };

    $scope.combo = {
      clase: undefined,
      categoria: undefined,
      grupo: undefined
    };
    $scope.combo.selected = {
      clase: producto.clase,
      categoria: producto.categoria,
      grupo: producto.grupo
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

    $scope.save = function() {
      $scope.working = true;

      $scope.view.producto.clase = {id: $scope.combo.selected.clase.id};
      $scope.view.producto.categoria = {id: $scope.combo.selected.categoria.id};
      $scope.view.producto.grupo = {id: $scope.combo.selected.grupo.id};
      
      $scope.view.producto.$save().then(
        function (response) {
          $scope.working = false;
          toastr.success('Producto actualizado.');
        },
        function error(err) {
          $scope.working = false;
          toastr.error(err.data.errorMessage);
        }
      );
    };

  });
