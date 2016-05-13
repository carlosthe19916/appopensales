'use strict';

/* jshint ignore:start */
angular.module(ApplicationConfiguration.applicationModuleName).factory('VoucherService', function ($filter, NumLetrasJ) {

  var fnPrueba = function (item) {
    var config = getUpdatedConfig();
    var data = [
      'Raw Data\n',
      'More Raw Data\n',
      'Even More Raw Data\n'
    ];
    qz.print(config, data).catch(function(e) { console.error(e); });
  };

  return {
    imprimirPrueba: fnPrueba
  };

});
/* jshint ignore:end */
