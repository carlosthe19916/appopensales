'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Busqueda.BusquedaProducto.BrowseController',
  function ($scope, $state, OSProducto) {

    var paginationOptions = {
      page: 1,
      pageSize: 5
    };

    $scope.filterOptions = {
      filterText: undefined
    };

    $scope.gridOptions = {
      data: [],
      config: {
        selectItems: false,
        multiSelect: false,
        dblClick: false,
        selectionMatchProp: 'denominacion',
        selectedItems: [],
        checkDisabled: checkDisabledItem,
        showSelectBox: true,
        onSelect: handleSelect,
        onSelectionChange: handleSelectionChange,
        onCheckBoxChange: handleCheckBoxChange,
        onClick: handleClick,
        onDblClick: handleDblClick
      },
      actionButtons: [],
      menuActions: [],
      enableButtonForItemFn: function(action, item) {
        return true;
      },
      updateMenuActionForItemFn: function(action, item) {
        action.isVisible = true;
      }
    };

    var handleSelect = function (item, e) {
      $scope.eventText = item.name + ' selected\r\n' + $scope.eventText;
    };
    var handleSelectionChange = function (selectedItems, e) {
      $scope.eventText = selectedItems.length + ' items selected\r\n' + $scope.eventText;
    };
    var handleClick = function (item, e) {
      $scope.eventText = item.name + ' clicked\r\n' + $scope.eventText;
    };
    var handleDblClick = function (item, e) {
      $scope.eventText = item.name + ' double clicked\r\n' + $scope.eventText;
    };
    var handleCheckBoxChange = function (item, selected, e) {
      $scope.eventText = item.name + ' checked: ' + item.selected + '\r\n' + $scope.eventText;
    };
    var checkDisabledItem = function(item) {
      return $scope.showDisabled && (item.name === "John Smith");
    };

    var performAction = function (action, item) {
      $scope.eventText = item.name + " : " + action.name + "\r\n" + $scope.eventText;
    };

    $scope.search = function () {
      var criteria = {
        filterText: $scope.filterOptions.filterText,
        filters: [],
        orders: [],
        paging: paginationOptions
      };

      OSProducto.$search(criteria).then(function (response) {
        $scope.gridOptions.data = response.items;
        $scope.gridOptions.totalItems = response.totalSize;
      }, function error(err) {
        toastr.error('El servidor no responde, intentelo nuevamente.');
      });
    };

  }
);
