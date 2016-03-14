'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Configuracion.Oficina.BuscarController',
  function ($scope, $state) {

    var paginationOptions = {
      page: 1,
      pageSize: 10
    };

    $scope.filterOptions = {
      filterText: undefined
    };

    $scope.gridOptions = {
      data: [],
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      multiSelect: false,

      paginationPageSizes: [10, 25, 50],
      paginationPageSize: 10,
      useExternalPagination: true,
      useExternalSorting: true,

      columnDefs: [
        {field: 'denominacion', displayName: 'Denominacion'},
        {field: 'ubigeo', displayName: 'Numero'},
        {
          name: 'edit',
          displayName: 'Edit',
          cellTemplate: '' +
          '<div style="text-align: center; padding-top: 5px;">' +
          '<button type="button" ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-default btn-xs">' +
          '<i class="pficon pficon-edit"></i>' +
          '<span>&nbsp;Editar</span>' +
          '</button>' +
          '</div>'
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
        $state.go('^.editar.resumen', {personaNatural: row.id});
      }
    };

    $scope.search = function () {
      var criteria = {
        filterText: $scope.filterOptions.filterText,
        filters: [],
        orders: [],
        paging: paginationOptions
      };

      /*SGPersonaNatural.$search(criteria).then(function (response) {
        $scope.gridOptions.data = response.items;
        $scope.gridOptions.totalItems = response.totalSize;
      });*/

      $scope.gridOptions.data = [{denominacion: 'Oficina de prueba', ubigeo: '050101'}];
      $scope.gridOptions.totalItems = 10;
    };

  }
);
