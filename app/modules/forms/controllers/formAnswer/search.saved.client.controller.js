'use strict';

/* jshint -W098 */
angular.module('forms').controller('Forms.FormAnswer.Search.SavedController',
    function ($scope, $state, toastr, SGDialog, SCFormAnswer, Auth) {

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
        answer: function(row) {
          $state.go('^.^.edit', {formAnswer: row.id});
        }
      };

      $scope.search = function () {
        var criteria = {
          filterText: $scope.filterOptions.filterText,
          filters: [
            {name: 'user', value: Auth.authz.idTokenParsed.preferred_username, operator: 'eq'},
            {name: 'valid', value: false, operator: 'bool_eq'}
          ],
          orders: [],
          paging: $scope.paginationOptions
        };
        SCFormAnswer.$search(criteria).then(function(response){
          $scope.gridOptions.data = response.items;
          $scope.gridOptions.totalItems = response.totalSize;
        });
      };
      $scope.search();

    });
