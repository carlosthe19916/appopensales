'use strict';

/* jshint -W098 */
angular.module('almacen').controller('Almacen.Almacen.Editar.Productos.Movimientos.BrowseController',
  function ($scope, $state, toastr, almacen, SCDialog, OSProducto) {

    $scope.working = false;

    $scope.view = {
      almacen: almacen
    };

    var paginationOptions = {
      page: 1,
      pageSize: 10
    };

    var getDangerClass = function(grid, row, col, rowRenderIndex, colRenderIndex) {
      var classes='';
      if(col.name === 'codigo' || col.name === 'entrada' || col.name === 'salida' || col.name === 'cantidad') {
        classes = 'text-right';
      }
      if (row.entity.stock[0].salida) {
        classes = classes + ' ui-grid-danger';
      }
      return classes;
    };

    $scope.filterOptions = {
      filterText: undefined
    };
    $scope.gridOptions = {
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
        {
          name: 'tipoMovimiento',
          displayName: 'T.Mov.',
          cellTemplate: '' +
          '<div class="text-center">' +
            '<span data-ng-show="row.entity.stock[0].entrada"><i class="fa fa-arrow-circle-o-down"></i> Entrada</span>'+
            '<span data-ng-show="row.entity.stock[0].salida"><i class="fa fa-arrow-circle-o-up"></i> Salida</span>'+
          '</div>',
          cellClass: getDangerClass,
          width: '5%'
        },
        {name: 'codigo', field: 'codigo', displayName: 'Codigo', cellClass: getDangerClass},
        {name: 'denominacion', field: 'denominacion', displayName: 'Denominacion', width: '25%', cellClass: getDangerClass},
        {name: 'unidadMedida', field: 'stock[0].unidadMedida', displayName: 'U.Medida', cellClass: getDangerClass},
        {name: 'marca', field: 'stock[0].marca', displayName: 'Marca', cellClass: getDangerClass},
        {name: 'entrada', field: 'stock[0].entrada', displayName: 'Entrada', cellFilter: 'number: 0', cellClass: getDangerClass},
        {name: 'salida', field: 'stock[0].salida', displayName: 'Salida', cellFilter: 'number: 0', cellClass: getDangerClass},
        {name: 'cantidad', field: 'stock[0].cantidad', displayName: 'Saldo', cellFilter: 'number: 0', cellClass: getDangerClass},
        {name: 'fecha', field: 'stock[0].fecha', displayName: 'Fecha', cellFilter: 'date: "dd/MM/yyyy HH:mm:ss" ', width: '10%', cellClass: getDangerClass},
        {
          name: 'actions',
          displayName: 'Acciones',
          cellTemplate: '' +
          '<div class="os-grid-action">' +
          '<div class="os-grid-action-cell os-45">' +
          '<button type="button" data-ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-default btn-block btn-sm">Editar</button>' +
          '</div>' +
          '<div class="os-grid-action-cell os-45">' +
          '<button type="button" data-ng-click="grid.appScope.gridActions.remove(row.entity)" class="btn btn-default btn-block btn-sm">Eliminar</button>' +
          '</div>' +
          '<div class="os-grid-action-cell os-10" uib-dropdown dropdown-append-to-body>' +
          '<button class="btn btn-default btn-block" type="button" uib-dropdown-toggle>' +
          '<i class="fa fa-ellipsis-v"></i>' +
          '</button>' +
          '<ul class="dropdown-menu-right" uib-dropdown-menu aria-labelledby="btn-append-to-body">' +
          '<li><a href="" data-ng-click="grid.appScope.gridActions.enable(row.entity)">Activar</a></li>' +
          '<li><a href="" data-ng-click="grid.appScope.gridActions.disable(row.entity)">Desactivar</a></li>' +
          '</ul>' +
          '</div>' +
          '</div>',
          width: '20%'
        }
      ],
      onRegisterApi: function (gridApi) {
        $scope.gridApi = gridApi;
        $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
          console.log('Order by. Not available.');
        });
        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
          paginationOptions.page = newPage;
          paginationOptions.pageSize = pageSize;
          $scope.search();
        });
      }
    };

    $scope.gridActions = {
      edit: function (row) {
      },
      remove: function (row) {
      }
    };

    $scope.search = function () {
      var criteria = {
        filterText: $scope.filterOptions.filterText,
        filters: [
          {name: 'id_almacen', value: almacen.id, operator: 'eq'}
        ],
        orders: [],
        paging: paginationOptions
      };
      OSProducto.$searchMovimientos(criteria).then(function (response) {
        $scope.gridOptions.data = response.items;
        $scope.gridOptions.totalItems = response.totalSize;
      }, function error(err) {
        toastr.error('El servidor no responde, intentelo nuevamente.');
      });
    };
    $scope.search();

  });
