'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Busqueda.BusquedaProducto.BrowseController',
  function ($scope, $state, OSProducto) {

    var handleSelect = function (item, e) {};
    var handleSelectionChange = function (selectedItems, e) {};
    var handleClick = function (item, e) {};
    var handleDblClick = function (item, e) {
      $scope.addProducto(item);
    };
    var handleCheckBoxChange = function (item, selected, e) {};
    var checkDisabledItem = function (item) {
      return !item.estado;
    };

    $scope.showMode = {
      values: ['default', 'large', 'list'],
      selected: 'default'
    };

    $scope.paginationOptions = {
      page: 1,
      pageSize: 5
    };
    $scope.filterOptions = {
      filterText: undefined
    };
    $scope.gridOptions = {
      data: [],
      totalItems: 0,
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
      enableButtonForItemFn: function (action, item) {
        return true;
      },
      updateMenuActionForItemFn: function (action, item) {
        action.isVisible = true;
      }
    };

    $scope.search = function () {
      var criteria = {
        filterText: $scope.filterOptions.filterText,
        filters: [],
        orders: [],
        paging: $scope.paginationOptions
      };

      OSProducto.$search(criteria).then(function (response) {
        $scope.gridOptions.data = response.items;
        $scope.gridOptions.totalItems = response.totalSize;
      }, function error(err) {
        toastr.error('El servidor no responde, intentelo nuevamente.');
      });
    };

    $scope.addProducto = function (item) {
      var producto = angular.copy(item);
      $scope.$parent.view.productos.push(producto);
    };

  }
);
