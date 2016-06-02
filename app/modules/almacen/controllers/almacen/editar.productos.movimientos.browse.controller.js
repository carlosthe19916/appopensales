'use strict';

/* jshint -W098 */
angular.module('almacen').controller('Almacen.Almacen.Editar.Productos.Movimientos.BrowseController',
  function ($scope, $state, toastr, almacen, SCDialog, OSProducto) {

    $scope.config = {
      title: 'Memory',
      units: 'GB'
    };
    $scope.donutConfig = {
      chartId: 'chartA',
      thresholds: {'warning':'60','error':'90'}
    };
    $scope.sparklineConfig = {
      'chartId': 'exampleSparkline',
      'tooltipType': 'default',
      'units': 'GB'
    };
    var today = new Date();
    var dates = ['dates'];
    for (var d = 20 - 1; d >= 0; d--) {
      dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
    }
    $scope.data = {
      dataAvailable: true,
      used: 76,
      total: 100,
      xData: dates,
      yData: ['used', '10', '20', '30', '20', '30', '10', '14', '20', '25', '68', '54', '56', '78', '56', '67', '88', '76', '65', '87', '76']
    };
    $scope.centerLabel = 'used';
    $scope.custShowXAxis = false;
    $scope.custShowYAxis = false;
    $scope.custChartHeight = 60;
    $scope.addDataPoint = function () {
      var newData = Math.round(Math.random() * 100);
      var newDate = new Date($scope.data.xData[$scope.data.xData.length - 1].getTime() + (24 * 60 * 60 * 1000));
      $scope.data.used = newData;
      $scope.data.xData.push(newDate);
      $scope.data.yData.push(newData);
    };

  });
