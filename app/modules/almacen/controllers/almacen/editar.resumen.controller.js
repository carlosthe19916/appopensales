'use strict';

/* jshint -W098 */
angular.module('almacen').controller('Almacen.Almacen.Editar.ResumenController',
  function ($scope, $state, almacen) {

    $scope.view = {
      almacen: almacen
    };

    $scope.items = {
      expediente1: {kind: 'Node', metadata: {name: almacen.expediente.nombreObra}},
      almacen1: {kind: 'Pod', metadata: {name: almacen.denominacion}}
    };
    $scope.relations = [
      {source: 'expediente1', target: 'almacen1'}
    ];

    $scope.kinds = {
      Pod: '#vertex-Pod',
      Node: '#vertex-Node',
      Route: '#vertex-Route',
      Service: '#vertex-Service'
    };

  });
