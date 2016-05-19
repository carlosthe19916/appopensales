'use strict';

/* jshint -W098 */
angular.module('almacen').controller('Almacen.Almacen.BuscarController',
  function ($scope, $state, toastr, SCDialog, OSPuntoVenta) {

    var paginationOptions = {
      page: 1,
      pageSize: 10
    };

    $scope.filterOptions = {
      filterText: undefined,
      estado: true
    };

    $scope.gridOptions = {
      data: [],
      enableRowSelection: true,
      enableSelectAll: true,
      enableRowHeaderSelection: true,
      multiSelect: true,

      paginationPageSizes: [10, 25, 50],
      paginationPageSize: 10,
      useExternalPagination: true,
      useExternalSorting: true,

      columnDefs: [
        {field: 'nombreObra', displayName: 'Denominacion'},
        {field: 'ubicacion', displayName: 'Ubicacion', width: '20%'},
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
        $state.go('^.editar.resumen', {puntoVenta: row.id});
      },
      remove: function (row) {
        /*SCDialog.confirmDelete('Punto de venta', row.nombreObra, function() {
          OSPuntoVenta.$new(row.id).$remove().then(function(response) {
            toastr.success('Punto de venta eliminado');
            $scope.search();
          }, function error(err) {
            toastr.error(err.data.errorMessage);
          });
        });*/
        alert('No se permite eliminar puntos de venta, prueba con desactivar');
      },
      enable: function(row) {
        if(row) {
          SCDialog.confirm('Guardar', 'Esta seguro de querer activar el punto de venta' + row.nombreObra +'?.', function() {
            OSPuntoVenta.$new(row.id).$enable().then(function(response) {
              toastr.success('Punto de venta activado');
              $scope.search();
            }, function error(err) {
              toastr.error(err.data.errorMessage);
            });
          });
        } else {
          alert('Operacion no implementada');
        }
      },
      disable : function(row) {
        if(row) {
          SCDialog.confirm('Guardar', 'Esta seguro de querer desactivar el punto de venta' + row.nombreObra +'?.', function() {
            OSPuntoVenta.$new(row.id).$disable().then(function(response) {
              toastr.success('Punto de venta desactivado');
              $scope.search();
            }, function error(err) {
              toastr.error(err.data.errorMessage);
            });
          });
        } else {
          alert('Operacion no implementada');
        }
      }
    };

    $scope.search = function () {
      var criteria = {
        filterText: $scope.filterOptions.filterText,
        filters: [],
        orders: [],
        paging: paginationOptions
      };
      if (angular.isDefined($scope.filterOptions.estado)) {
        criteria.filters = [{name: 'estado', value: $scope.filterOptions.estado, operator: 'bool_eq'}];
      }

      OSPuntoVenta.$search(criteria).then(function (response) {
        $scope.gridOptions.data = response.items;
        $scope.gridOptions.totalItems = response.totalSize;
      }, function error(err) {
        toastr.error('El servidor no responde, intentelo nuevamente.');
      });
    };

    $scope.$watch('filterOptions.estado', function(newValue, oldValue) {
      if(newValue !== oldValue) {
        $scope.search();
      }
    }, true);

  }
);
