'use strict';

/* jshint -W098 */
angular.module('almacen').controller('Almacen.Almacen.Editar.Productos.Movimientos.TableController',
  function ($scope, $state, toastr, almacen, SCDialog, OSProducto) {

    $scope.working = false;

    $scope.view = {
      almacen: almacen
    };

    var paginationOptionsEntrada = {
      page: 1,
      pageSize: 10
    };
    var paginationOptionsSalida = {
      page: 1,
      pageSize: 10
    };

    $scope.filterOptionsEntrada = {
      filterText: undefined
    };
    $scope.filterOptionsSalida = {
      filterText: undefined
    };

    $scope.gridOptionsEntrada = {
      data: [],
      totalItems: 0,

      enableRowSelection: true,
      enableSelectAll: true,
      enableRowHeaderSelection: true,
      multiSelect: true,

      paginationPageSizes: [10, 25, 50],
      paginationPageSize: 10,
      useExternalPagination: true,
      useExternalSorting: true,

      columnDefs: [
        {name: 'codigo', field: 'codigo', displayName: 'Codigo', cellClass: 'text-right'},
        {name: 'denominacion', field: 'denominacion', displayName: 'Denominacion', width: '30%'},
        {name: 'unidadMedida', field: 'stock[0].unidadMedida', displayName: 'U.Medida', cellClass: 'text-right'},
        {name: 'marca', field: 'stock[0].marca', displayName: 'Marca', cellClass: 'text-right'},
        {name: 'entrada', field: 'stock[0].entrada', displayName: 'Entrada', cellFilter: 'number: 2', cellClass: 'text-right'},
        {name: 'cantidad', field: 'stock[0].cantidad', displayName: 'Saldo', cellFilter: 'number: 2', cellClass: 'text-right'},
        {name: 'fecha', field: 'stock[0].fecha', displayName: 'Fecha', cellFilter: 'date: "dd/MM/yyyy HH:mm:ss" ', cellClass: 'text-right', width: '20%'}
      ],
      onRegisterApi: function (gridApi) {
        $scope.gridApiEntrada = gridApi;
        $scope.gridApiEntrada.core.on.sortChanged($scope, function (grid, sortColumns) {
          console.log('Order by. Not available.');
        });
        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
          paginationOptionsEntrada.page = newPage;
          paginationOptionsEntrada.pageSize = pageSize;
          $scope.searchEntrada();
        });
      }
    };
    $scope.gridOptionsSalida = {
      data: [],
      totalItems: 0,

      enableRowSelection: true,
      enableSelectAll: true,
      enableRowHeaderSelection: true,
      multiSelect: true,

      paginationPageSizes: [10, 25, 50],
      paginationPageSize: 10,
      useExternalPagination: true,
      useExternalSorting: true,

      columnDefs: [
        {name: 'codigo', field: 'codigo', displayName: 'Codigo', cellClass: 'text-right'},
        {name: 'denominacion', field: 'denominacion', displayName: 'Denominacion', width: '30%'},
        {name: 'unidadMedida', field: 'stock[0].unidadMedida', displayName: 'U.Medida', cellClass: 'text-right'},
        {name: 'marca', field: 'stock[0].marca', displayName: 'Marca', cellClass: 'text-right'},
        {name: 'salida', field: 'stock[0].salida', displayName: 'Salida', cellFilter: 'number: 2', cellClass: 'text-right'},
        {name: 'cantidad', field: 'stock[0].cantidad', displayName: 'Saldo', cellFilter: 'number: 2', cellClass: 'text-right'},
        {name: 'fecha', field: 'stock[0].fecha', displayName: 'Fecha', cellFilter: 'date: "dd/MM/yyyy HH:mm:ss" ', cellClass: 'text-right', width: '20%'}
      ],
      onRegisterApi: function (gridApi) {
        $scope.gridApiSalida = gridApi;
        $scope.gridApiSalida.core.on.sortChanged($scope, function (grid, sortColumns) {
          console.log('Order by. Not available.');
        });
        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
          paginationOptionsSalida.page = newPage;
          paginationOptionsSalida.pageSize = pageSize;
          $scope.searchSalida();
        });
      }
    };

    $scope.gridActions = {
      edit: function (row) {
      },
      remove: function (row) {
      }
    };

    $scope.searchEntrada = function () {
      var criteria = {
        filterText: $scope.filterOptionsEntrada.filterText,
        filters: [
          {name: 'id_almacen', value: almacen.id, operator: 'eq'},
          {name: 'cant_entrada', value: 0, operator: 'gt'}
        ],
        orders: [],
        paging: paginationOptionsEntrada
      };
      if($scope.$parent.filterOptions.periodo.value.desde) {
        criteria.filters.push({name: 'fecha_registro', value: $scope.$parent.filterOptions.periodo.value.desde, operator: 'gte'});
      }
      if($scope.$parent.filterOptions.periodo.value.hasta) {
        criteria.filters.push({name: 'fecha_registro', value: $scope.$parent.filterOptions.periodo.value.hasta, operator: 'lte'});
      }
      
      OSProducto.$searchMovimientos(criteria).then(function (response) {
        $scope.gridOptionsEntrada.data = response.items;
        $scope.gridOptionsEntrada.totalItems = response.totalSize;
      }, function error(err) {
        toastr.error('El servidor no responde, intentelo nuevamente.');
      });
    };
    $scope.searchSalida = function () {
      var criteria = {
        filterText: $scope.filterOptionsSalida.filterText,
        filters: [
          {name: 'id_almacen', value: almacen.id, operator: 'eq'},
          {name: 'cant_salida', value: 0, operator: 'gt'}
        ],
        orders: [],
        paging: paginationOptionsSalida
      };
      if($scope.$parent.filterOptions.periodo.value.desde) {
        criteria.filters.push({name: 'fecha_registro', value: $scope.$parent.filterOptions.periodo.value.desde, operator: 'gte'});
      }
      if($scope.$parent.filterOptions.periodo.value.hasta) {
        criteria.filters.push({name: 'fecha_registro', value: $scope.$parent.filterOptions.periodo.value.hasta, operator: 'lte'});
      }

      OSProducto.$searchMovimientos(criteria).then(function (response) {
        $scope.gridOptionsSalida.data = response.items;
        $scope.gridOptionsSalida.totalItems = response.totalSize;
      }, function error(err) {
        toastr.error('El servidor no responde, intentelo nuevamente.');
      });
    };
    $scope.searchEntrada();
    $scope.searchSalida();

    $scope.$watch('filterOptions.periodo.value', function (newVal, oldVal) {
      $scope.searchEntrada();
      $scope.searchSalida();
    }, true);

  });
