'use strict';

// Setting up sidebar
angular.module('persona').controller('PersonaSidebarController',
	function ($scope, $menuItemsPersona) {

		$scope.menuItems = $menuItemsPersona.prepareSidebarMenu().getAll();

	}
);
