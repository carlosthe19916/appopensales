'use strict';

/* jshint -W098 */
angular.module('forms').controller('Forms.Form.SearchController',
    function ($scope, $state, toastr, SGDialog, SCForm) {

      $scope.paginationOptions = {
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
        paginationPageSize: 10
      };
      $scope.gridActions = {
        edit: function (row) {
          $state.go('^.edit', {form: row.id});
        },
        remove: function(row) {
          SGDialog.confirmDelete(row.title, 'Encuesta', function() {
            SCForm.$new(row.id).$remove().then(
              function(response){
                toastr.success('Encuesta eliminada satisfactoriamente');
                $scope.search();
              },
              function error(err){
                toastr.error(err.data.errorMessage);
              }
            );
          });
        }
      };

      $scope.search = function () {
        var criteria = {
          filterText: $scope.filterOptions.filterText,
          filters: [],
          orders: [],
          paging: $scope.paginationOptions
        };
        SCForm.$search(criteria).then(function(response){
          $scope.gridOptions.data = response.items;
          $scope.gridOptions.totalItems = response.totalSize;
        });
      };
      $scope.search();

    });
