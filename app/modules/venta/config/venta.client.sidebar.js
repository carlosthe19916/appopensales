'use strict';

// Setting up sidebar
angular.module('venta').controller('VentaSidebarController',
	function ($scope, $menuItemsVenta) {

		$scope.menuItems = $menuItemsVenta.prepareSidebarMenu().getAll();

	}
);
