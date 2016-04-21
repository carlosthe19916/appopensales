'use strict';

/* jshint -W098 */
angular.module('persona').controller('Rrhh.Trabajador.BuscarController',
  function ($scope, $state, toastr, OSTrabajador, SCDialog) {

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
        {field: 'numeroDocumento', displayName: 'Numero'},
        {field: 'apellidoPaterno', displayName: 'Ap.paterno'},
        {field: 'apellidoMaterno', displayName: 'Ap.materno'},
        {field: 'nombres', displayName: 'Nombres'},
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
        $state.go('^.editar.resumen', {personaNatural: row.id});
      },
      remove: function (row) {
        SCDialog.confirmDelete('Persona', row.nombres, function() {
          OSPersona.$new(row.id).$remove().then(function(response) {
            toastr.success('Persona eliminada.');
            $scope.search();
          }, function error(err) {
            toastr.error(err.data.message);
          });
        });
      },
      enable: function(row) {
        if(row) {
          SCDialog.confirm('Guardar', 'Esta seguro de querer activar la persona' + row.nombres +'?.', function() {
            OSPersona.$new(row.id).$enable().then(function(response) {
              toastr.success('Persona activada.');
              $scope.search();
            }, function error(err) {
              toastr.error(err.data.message);
            });
          });
        } else {
          alert('Operacion no implementada');
        }
      },
      disable : function(row) {
        if(row) {
          SCDialog.confirm('Guardar', 'Esta seguro de querer desactivar la persona' + row.nombres +'?.', function() {
            OSPersona.$new(row.id).$disable().then(function(response) {
              toastr.success('Persona desactivada.');
              $scope.search();
            }, function error(err) {
              toastr.error(err.data.message);
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
        criteria.filters.push({name: 'estado', value: $scope.filterOptions.estado, operator: 'bool_eq'});
      }

      OSTrabajador.$search(criteria).then(function (response) {
        $scope.gridOptions.data = response.items;
        $scope.gridOptions.totalItems = response.totalSize;
      });
    };

    $scope.$watch('filterOptions.estado', function(newValue, oldValue) {
      if(newValue !== oldValue) {
        $scope.search();
      }
    }, true);

  });
