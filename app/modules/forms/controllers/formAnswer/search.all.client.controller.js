'use strict';

/* jshint -W098 */
angular.module('forms').controller('Forms.FormAnswer.Search.AllController',
    function ($scope, $state, toastr, SGDialog, SCForm, SCFormAnswer, Auth) {

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
        answer: function(form) {
          var formAnswer = SCFormAnswer.$build();
          formAnswer.form = {
            id: form.id
          };
          formAnswer.user = Auth.authz.idTokenParsed.preferred_username;
          formAnswer.$save().then(
            function (response) {
              $state.go('^.^.edit', {formAnswer: response.id});
            },
            function error(err){
              toastr.error(err.data.errorMessage);
            }
          );
        }
      };

      $scope.search = function () {
        var criteria = {
          filterText: $scope.filterOptions.filterText,
          filters: [{name: 'active', value: true, operator: 'bool_eq'}],
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
