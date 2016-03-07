'use strict';

// Setting up sidebar
angular.module('producto').controller('ProductoSidebarController',
	function ($scope, $menuItemsProducto) {

		$scope.menuItems = $menuItemsVenta.$menuItemsProducto().getAll();

	}
);
