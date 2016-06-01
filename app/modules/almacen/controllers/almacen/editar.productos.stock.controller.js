'use strict';

/* jshint -W098 */
angular.module('almacen').controller('Almacen.Almacen.Editar.Productos.StockController',
  function ($scope, $state, toastr, almacen, SCDialog, OSProducto) {

    $scope.working = false;

    $scope.view = {
      almacen: almacen
    };

    var paginationOptions = {
      page: 1,
      pageSize: 10
    };
    var sortOptions = [];
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
        {field: 'codigo', displayName: 'Codigo', cellClass: 'text-right', width: '10%'},
        {field: 'denominacion', displayName: 'Denominacion', width: '30%'},
        {field: 'stock[0].unidadMedida', displayName: 'U.Medida'},
        {field: 'stock[0].marca', displayName: 'Marca'},
        {field: 'stock[0].cantidad', displayName: 'Cantidad', cellFilter: 'number: 0', cellClass: 'text-right', width: '10%'},
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
          sortOptions = [];
          for(var i = 0; i < sortColumns.length; i++) {
            if(sortColumns[i].name !== 'actions' && sortColumns[i].name !== 'unidadMedida' && sortColumns[i].name !== 'marca') {
              sortOptions.push({name: sortColumns[i].name, ascending: sortColumns[i].sort.direction === 'asc'});
              $scope.search();
            }
          }
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
        orders: sortOptions,
        paging: paginationOptions
      };
      OSProducto.$searchStock(criteria).then(function (response) {
        $scope.gridOptions.data = response.items;
        $scope.gridOptions.totalItems = response.totalSize;
      }, function error(err) {
        toastr.error('El servidor no responde, intentelo nuevamente.');
      });
    };
    $scope.search();

  });
