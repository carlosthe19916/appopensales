'use strict';

/* jshint -W098 */
angular.module('venta').controller('Venta.Busqueda.BusquedaProducto.BrowseController',
  function ($scope, $state, $uibModal, SCDialog, OSProducto) {

    var handleSelect = function (item, e) { return angular.noop; };
    var handleSelectionChange = function (selectedItems, e) { return angular.noop;  };
    var handleClick = function (item, e) { return angular.noop; };
    var handleDblClick = function (item, e) { actionEnviar(e, item); };
    var handleCheckBoxChange = function (item, selected, e) { return angular.noop;  };
    var checkDisabledItem = function (item) { return (!item.estado || item.estado == '0'); };

    var actionEnviar = function (e, item) {
      var modalInstance = $uibModal.open({
        templateUrl: 'modules/venta/views/operaciones/venta/venta.crear.modal.cantidadProducto.html',
        controller: 'Venta.Crear.Modal.CantidadProductoController',
        resolve: {
          producto: item
        }
      });
      modalInstance.result.then(function (itemUpdated) {
        $scope.addProducto(itemUpdated);
      }, function () {});
    };
    var actionVer = function (e, item) {
      var modalInstance = $uibModal.open({
        templateUrl: 'modules/venta/views/operaciones/venta/venta.crear.modal.verProducto.html',
        controller: 'Venta.Crear.Modal.VerProductoController'
      });
      modalInstance.result.then(function (cantidad) {
        item.cantidad = cantidad;
        $scope.addProducto(item);
      }, function () {});
    };

    $scope.addProducto = function (item) {
      var producto = angular.copy(item);
      $scope.$parent.view.productos.push(producto);
    };

    /***/
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
      actionButtons: [
        {
          name: 'Enviar',
          actionFn: actionEnviar
        },
        {
          name: 'Ver',
          actionFn: actionVer
        }
      ],
      menuActions: [
        /*{ name: 'Action', title: 'Perform an action', actionFn: angular.noop },
        { name: 'Another Action', title: 'Do something else', actionFn: angular.noop },
        { name: 'Disabled Action', title: 'Unavailable action', actionFn: angular.noop, isDisabled: true },
        { name: 'Something Else', title: '', actionFn: angular.noop },
        { isSeparator: true },
        { name: 'Grouped Action 1', title: 'Do something',  actionFn: angular.noop },
        { name: 'Grouped Action 2', title: 'Do something similar', actionFn: angular.noop }*/
      ],
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

  }
);
