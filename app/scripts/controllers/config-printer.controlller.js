'use strict';

// Directives for common buttons
angular.module(ApplicationConfiguration.applicationModuleName).controller('ConfigPrinterController', function ($scope, $timeout, toastr, localStorageService, QzTrayConnectConfig, QzTrayPrinterConfig, QzTrayService) {

  $scope.$watch(function () {
    return QzTrayService.cfg;
  }, function (newVal, oldVal) {
    if (newVal !== oldVal) {
        $scope.printer = newVal.getPrinter();
        $scope.options = newVal.getOptions();
    }
  }, true);

  $scope.working = false;

  $scope.view = {
    printer: {},
    printers: []
  };

  $scope.connection = {
    enable: QzTrayService.isActive(),
    config: QzTrayConnectConfig
  };

  $scope.connectionChange = function() {
    if($scope.connection.enable) {
      var showError = function (err) {
        toastr.error(err);
      };

      QzTrayService.startConnection(QzTrayConnectConfig).then(function () {
        toastr.info('Coneccion establecida con QZ Tray en ' + QzTrayConnectConfig.host);
        if (QzTrayPrinterConfig.printer.name) {
          QzTrayService.findPrinter(QzTrayPrinterConfig.printer.name).then(function (data) {
            QzTrayService.setPrinter(QzTrayPrinterConfig.printer);
            toastr.info('Impresora ' + data + ' conectada');
          }).catch(showError);
        } else {
          QzTrayService.findDefaultPrinter().then(function (data) {
            QzTrayService.setPrinter(data);
            toastr.info('Impresora ' + data + ' conectada');
          }).catch(showError);
        }
      }).catch(showError);
    } else {
      QzTrayService.endConnection().then(function () {
        toastr.warning('Coneccion con QZ Tray cerrada');
      }).catch(showError);
    }
  };
  $scope.saveConnection = function () {
    QzTrayService.saveConnectConfig();
    toastr.success('Configuracion de coneccion guardada');
  };

  
  /***/
  $scope.selectPrinter = function () {
    QzTrayService.setPrinter(angular.copy($scope.view.printer));
    toastr.info('Impresora ' + $scope.view.printer.name + ' seleccionada');
  };
  $scope.printTestPage = function () {
    var data = ['^XA^FO50,50^ADN,36,20^FDRAW ZPL EXAMPLE^FS^XZ'];   // Raw ZPL
    QzTrayService.print(data);
    toastr.info('Pagina de prueba enviada a la impresora');
  };
  $scope.savePrinter = function () {
    QzTrayPrinterConfig.printer = QzTrayService.getPrinter();
    QzTrayService.savePrinterConfig();
    toastr.success('Configuracion de coneccion guardada');
  };


  /***/
  $scope.findPrinters = function () {
    $scope.view.printers = [];
    QzTrayService.findPrinters().then(function (data) {
      $scope.$apply(function () {
        $scope.view.printers = data;
      });
    }).catch(function (err) {
      toastr.error('No se pudo obtener la lista de impresoras disponibles');
    });
  };
  $scope.selectPrinterName = function (name) {
    $scope.view.printer.name = name;
  };
  $scope.findPrinter = function () {
    QzTrayService.findPrinter($scope.view.printer.name).then(function (data) {
      toastr.info('Impresora encontrada');
    }).catch(function (err) {
      toastr.error('Impresora no encontrada');
    });
  };


});
