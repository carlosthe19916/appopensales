'use strict';

/* jshint ignore:start */
angular.module(ApplicationConfiguration.applicationModuleName).factory('VoucherService', function ($filter, NumLetrasJ) {

  var fnResetPrinter = function () {
    qz.append("\x1B\x40");
  };
  var fnCabecera = function () {
    fnNegritaCentrado();
    //fnNegritaCentrado('Nombre de empresa, usar constants');
  };
  var fnSaltoLinea = function () {
    qz.append('\r\n');
  };
  var fnCentrado = function (text) {
    qz.append(String.fromCharCode(27) + '\x61' + '\x31');//centrado
    qz.append(text);
    qz.append('\r\n');//salto de linea
    qz.append(String.fromCharCode(27) + '\x61' + '\x30');//texto a la izquierda
  };
  var fnNegritaCentrado = function (text) {
    qz.append('\x1B\x21\x08');//negrita
    qz.append(String.fromCharCode(27) + '\x61' + '\x31');//centrado
    qz.append(text);
    qz.append('\r\n');//salto de linea
    qz.append('\x1B\x21\x01');//quitar negrita
    qz.append(String.fromCharCode(27) + '\x61' + '\x30');//texto a la izquierda
  };
  var fnTabTexto = function (text1, text2, numeroTabs) {
    qz.append(text1);
    if (numeroTabs) {
      for (var i = 0; i < numeroTabs; i++) {
        qz.append('\t');
      }
    } else {
      qz.append('\t');
    }
    qz.append(text2 || ' ');
    qz.append('\r\n');//salto de linea
  };
  var fnTabTexto3 = function (text1, text2, text3) {
    qz.append(text1 + '\t');
    qz.append(text2 + '\t');
    qz.append(text3 + '\t');
    qz.append('\r\n');//salto de linea
  };
  var fnImprimir = function () {
    qz.append('\x1D\x56\x41');//cortar papel
    qz.append('\x1B\x40');//reset
    qz.print();//imprimir
  };

  var fnCuentaAporte = function (item) {
    alert('Metodo no implementado');
  };

  var fnCompraVenta = function (item) {
    if (notReady()) {
      return;
    }
    fnResetPrinter();

    fnCabecera();
    fnNegritaCentrado(item.tipoTransaccion + ' M.E.');
    fnTabTexto(item.agenciaAbreviatura, 'TRANS.: ' + item.id);
    fnTabTexto('CAJA: ' + item.cajaDenominacion, 'NRO.OP.: ' + item.numeroOperacion);
    fnTabTexto('FECHA: ' + $filter('date')(item.fecha, 'dd/MM/yyyy'), 'HORA: ' + $filter('date')(item.hora, 'HH:mm:ss'));
    if (item.referencia) {
      var cadena1 = '';
      var cadena2 = '';
      var indexNumbers = -1;
      var array = item.referencia.split(' ');
      for(var i = 0; i < array.length; i++) {
        if(/\d/.test(array[i])) {
          indexNumbers = i;
        }
      }
      if(indexNumbers !== -1) {
        for(var i = 0; i <= indexNumbers; i++) {
          cadena1 = cadena1 + array[i] + ' ';
        }
        for(var i = indexNumbers + 1 ; i < array.length; i++) {
          cadena2 = cadena2 + array[i] + ' ';
        }
        fnTabTexto('CLIENTE:' + cadena1);
        fnTabTexto('        ' + cadena2);
      } else {
        fnTabTexto('CLIENTE:' + item.referencia);
      }
    }

    function Recibido(obj) {
      if (obj.monedaRecibida.simbolo === '€') {
        fnTabTexto('RECIBIDO: ', $filter('currency')(obj.montoRecibido, chr(238)));
      } else {
        fnTabTexto('RECIBIDO: ', $filter('currency')(obj.montoRecibido, obj.monedaRecibida.simbolo));
      }
    }

    function Entregado(obj) {
      if (item.monedaEntregada.simbolo === '€') {
        fnTabTexto('ENTREGADO: ', $filter('currency')(obj.montoEntregado, chr(238)));
      } else {
        fnTabTexto('ENTREGADO: ', $filter('currency')(obj.montoEntregado, obj.monedaEntregada.simbolo));
      }
    }

    if (item.tipoTransaccion === 'COMPRA') {
      Recibido(item);
      fnTabTexto('TIPO DE CAMBIO: ' + $filter('number')(item.tipoCambio, 3));
      Entregado(item);
    } else {
      Entregado(item);
      fnTabTexto('TIPO DE CAMBIO: ' + $filter('number')(item.tipoCambio, 3));
      Recibido(item);
    }

    fnSaltoLinea();
    fnCentrado('Gracias por su preferencia');
    fnCentrado('Verifique su dinero antes  de retirarse de ventanilla');
    fnImprimir();
  };

  return {
    imprimirVoucherCompraVenta: fnCompraVenta
  };

});
/* jshint ignore:end */
