'use strict';

/* jshint -W098 */
angular.module('almacen').controller('Almacen.Almacen.Editar.Productos.MovimientosController',
  function ($scope, $state, toastr, almacen, SCDialog, OSProducto) {

    $scope.filterOptions = {
      periodo: {
        name: 'CUALQUIERA',
        value: {
          desde: undefined,
          hasta: undefined
        }
      }
    };
    $scope.filter = 1;

    $scope.$watch('filterOptions.periodo.name', function (newVal, oldVal) {
      if(newVal !== oldVal) {
        var filter = {};
        if($scope.filterOptions.periodo.name === 'SEMANA') {
          filter.desde = new Date();
          filter.hasta = new Date();
          filter.desde.setDate(filter.desde.getDate() - 7);
        } else if($scope.filterOptions.periodo.name === 'MES') {
          filter.desde = new Date();
          filter.hasta = new Date();
          filter.desde.setDate(filter.desde.getDate() - 30);
        } else if($scope.filterOptions.periodo.name === 'ANIO') {
          filter.desde = new Date();
          filter.hasta = new Date();
          filter.desde.setDate(filter.desde.getDate() - 360);
        } else if($scope.filterOptions.periodo.name === 'CUALQUIERA') {
          filter.desde = undefined;
          filter.hasta = undefined;
        } else {
          console.log('Method undefined');
        }
        $scope.filterOptions.periodo.value = filter;
      }
    }, true);

  });
