'use strict';

// Setting up sidebar
angular.module('almacen').controller('AlmacenSidebarController',
	function ($scope, $menuItemsAlmacen) {

		$scope.menuItems = $menuItemsAlmacen.prepareSidebarMenu().getAll();

	}
);
