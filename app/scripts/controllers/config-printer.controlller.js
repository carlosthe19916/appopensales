'use strict';

// Directives for common buttons
angular.module(ApplicationConfiguration.applicationModuleName).controller('ConfigPrinterController', function ($scope, localStorageService, toastr, PRINTER) {

  $scope.view = {
    printer: PRINTER,
    printers: []
  };

  $scope.findPrinter = function () {
    findPrinter($scope.view.printer.default.name).then(function (data) {
      toastr.info('Impresora encontrada');
    }).catch(function (err) {
      toastr.error('Impresora no encontrada');
    });
  };
  $scope.findPrinters = function () {
    $scope.view.printers = [];
    findPrinters().then(function (data) {
      $scope.view.printers = data;
    }).catch(function (err) {
      toastr.error('No se pudo obtener la lista de impresoras disponibles');
    });
  };
  $scope.findPrinters();
  $scope.printTestPage = function () {
    printBase64().catch(function (err) {
      toastr.error('No se pudo imprimir la pagina de prueba');
    });
  };

  $scope.selectPrinter = function (printerName) {
    $scope.view.printer.default.name = printerName;
  };

  $scope.save = function () {
    PRINTER.save();
    toastr.success('Configuracion guardada');
  };

});
