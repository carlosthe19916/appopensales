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




  var fnResetPrinter = function () {
    qz.append("\x1B\x40");
  };
  var fnCabecera = function () {
    fnNegritaCentrado(EMPRESA);
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

  var fnConsultaEstadoCuenta = function(item) {
    if (notReady()) {
      return;
    }
    fnResetPrinter();

    fnCabecera();
    fnNegritaCentrado(' CONSULTA ESTADO CUENTA ');
    fnTabTexto('FECHA: ' + $filter('date')(new Date(), 'dd/MM/yyyy'), 'HORA: ' + $filter('date')(new Date(), 'HH:mm:ss'));

    fnTabTexto('CLIENTE: ' + item.socio);

    fnTabTexto('T.CUENTA: ' + item.tipoCuenta);
    fnTabTexto('NRO.CUENTA: ' + item.numeroCuenta);
    fnTabTexto('MONEDA: ' + item.moneda);
    fnTabTexto('SALDO: ' + item.moneda + $filter('number')(item.saldo, 2));

    fnSaltoLinea();
    fnCentrado('Gracias por su preferencia');
    fnImprimir();
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

  var fnCuentaPersonal = function (item, saldo) {
    if (notReady()) {
      return;
    }
    fnResetPrinter();

    fnCabecera();
    fnNegritaCentrado(item.tipoTransaccion + ' CUENTA ' + item.tipoCuentaBancaria + (item.moneda.simbolo == 'S/.' ? ' M.N.' : ' M.E.'));

    fnTabTexto(item.agenciaAbreviatura, 'TRANS.: ' + item.idTransaccionBancaria);
    fnTabTexto('CAJA: ' + item.cajaDenominacion, 'NRO.OP.: ' + item.numeroOperacion);
    fnTabTexto('FECHA: ' + $filter('date')(item.fecha, 'dd/MM/yyyy'), 'HORA: ' + $filter('date')(item.hora, 'HH:mm:ss'));
    fnTabTexto('NRO CTA: ' + item.numeroCuenta);
    fnTabTexto('CLIENTE: ' + item.socio);
    fnTabTexto('MONEDA: ' + item.moneda.denominacion);
    if (item.referencia) {
      fnTabTexto('REF.: ' + item.referencia);
    }
    fnSaltoLinea();

    if (item.tipoTransaccion === 'DEPOSITO') {
      fnTabTexto('IMPORTE RECIBIDO: ' + item.moneda.simbolo + $filter('number')(item.monto, 2));
    } else {
      fnTabTexto('IMPORTE PAGADO:' + item.moneda.simbolo + $filter('number')(item.monto, 2));
    }

    if (saldo === true) {
      if (item.interes !== 0) {
        fnTabTexto('INTERES: ' + item.moneda.simbolo + $filter('number')(item.interes, 2));
      }
    }

    if (saldo === true) {
      fnTabTexto('SALDO DISPONIBLE: ' + item.moneda.simbolo + $filter('number')(item.saldoDisponible, 2));
    }

    if (item.tipoTransaccion === 'DEPOSITO') {
      fnSaltoLinea();
      fnCentrado('Verifique su dinero antes  de retirarse de ventanilla');
    } else {
      fnSaltoLinea();
      fnSaltoLinea();
      fnCentrado('____________________');
      fnCentrado(item.titulares);
      fnCentrado('Gracias por su preferencia');
      fnCentrado('Verifique su dinero antes de retirarse  de ventanilla');
    }

    fnImprimir();
  };

  var fnTransferencia = function (item) {
    if (notReady()) {
      return;
    }
    fnResetPrinter();

    fnCabecera();
    fnNegritaCentrado('TRANSFERENCIA CUENTA PERSONAL');

    fnTabTexto(item.agenciaAbreviatura, 'TRANS.: ' + item.id);
    fnTabTexto('CAJA: ' + item.cajaDenominacion, 'NRO.OP.: ' + item.numeroOperacion);
    fnTabTexto('FECHA: ' + $filter('date')(item.fecha, 'dd/MM/yyyy'), 'HORA: ' + $filter('date')(item.hora, 'HH:mm:ss'));
    fnTabTexto('CUENTA ORIGEN: ' + item.numeroCuentaOrigen);
    fnTabTexto('CUENTA DESTINO: ' + item.numeroCuentaDestino);
    fnTabTexto('CLIENTE: ' + item.socio);
    fnTabTexto('MONEDA: ' + item.moneda.denominacion);
    if (item.referencia) {
      fnTabTexto('REF.: ' + item.referencia);
    }
    fnSaltoLinea();

    fnTabTexto('MONTO:' + item.moneda.simbolo + $filter('number')(item.monto, 2));

    fnSaltoLinea();
    fnSaltoLinea();
    fnCentrado('____________________');
    fnCentrado(item.titulares);
    fnCentrado('Gracias por su preferencia');
    fnCentrado('Verifique su dinero antes de retirarse  de ventanilla');

    fnImprimir();
  };

  var fnCheque = function (item) {
    if (notReady()) {
      return;
    }
    fnResetPrinter();

    fnCabecera();
    fnNegritaCentrado('COBRO DE CHEQUE');

    fnTabTexto(item.agenciaAbreviatura, 'TRANS.: ' + item.idTransaccionBancaria);
    fnTabTexto('CAJA: ' + item.cajaDenominacion, 'NRO.OP.: ' + item.numeroOperacion);
    fnTabTexto('FECHA: ' + $filter('date')(item.fecha, 'dd/MM/yyyy'), 'HORA: ' + $filter('date')(item.hora, 'HH:mm:ss'));

    fnTabTexto('NUM.CHEQUE: ' + item.numeroCheque);
    fnTabTexto('T.DOC.: ' + item.tipoDocumento.abreviatura, 'NUM.DOC.: ' + item.numeroDocumento);
    fnTabTexto('CLIENTE: ' + item.socio);
    fnTabTexto('MONTO: ' + item.moneda.simbolo + $filter('number')(item.monto, 2));

    fnSaltoLinea();
    fnCentrado('____________________');
    fnCentrado('Gracias por su preferencia');
    fnCentrado('Verifique su dinero antes de retirarse  de ventanilla');

    fnImprimir();
  };

  var fnGiro = function (item) {
    if (notReady()) {
      return;
    }
    fnResetPrinter();

    fnCabecera();

    if (item.estado === 'ENVIADO') {
      fnNegritaCentrado('GIRO EN EFECTIVO');
    } else if (($scope.giro.estado) == "COBRADO") {
      fnNegritaCentrado('COBRO DE GIRO');
    }

    fnTabTexto('Nro GIRO:', item.id);
    fnTabTexto('FECHA: ' + $filter('date')(item.fechaEnvio, 'dd/MM/yyyy'), 'HORA: ' + $filter('date')(item.fechaEnvio, 'HH:mm:ss'));
    fnTabTexto('ORDENANTE:', item.clienteEmisor);
    fnTabTexto('BENEFICIARIO:', item.clienteReceptor);
    fnTabTexto('AG.ORIGEN:', item.agenciaOrigen.abreviatura);
    fnTabTexto('AG.DESTINO:', item.agenciaDestino.abreviatura);
    fnTabTexto('MONEDA:', item.moneda.denominacion);

    if ($scope.item.estado === 'ENVIADO') {
      fnTabTexto('MONTO GIRO:', ($filter('currency')(item.monto, item.moneda.simbolo)));

      if (item.lugarPagoComision === 'AL_ENVIAR') {
        fnTabTexto('COMISION:', ($filter('currency')(item.comision, item.moneda.simbolo)));
      } else {
        fnTabTexto('COMISION A COBRAR:', ($filter('currency')(item.comision, item.moneda.simbolo)));
      }

      var total = 0;
      if (item.estadoPagoComision) {
        fnTabTexto('TOTAL:', ($filter('currency')(item.comision + item.monto, item.moneda.simbolo)));
        total = item.comision + item.monto;
      } else {
        fnTabTexto('TOTAL:', ($filter('currency')(item.monto, item.moneda.simbolo)));
        total = item.monto;
      }

      var decimal = Math.floor((total - Math.floor(total)) * 100);
      fnTabTexto(NumLetrasJ.Convierte(parseInt(total).toString()).toUpperCase() + ' Y ' + decimal + '/100 ');
    } else if (item.estado === 'COBRADO') {
      fnTabTexto('MONTO GIRO:', $filter('currency')(item.monto, item.moneda.simbolo));

      var total = 0;
      if (item.lugarPagoComision === 'AL_ENVIAR') {
        total = item.monto;
      } else {
        fnTabTexto('COMISION:', $filter('currency')(item.comision, item.moneda.simbolo));
        fnTabTexto('MONTO:', $filter('currency')(item.monto - item.comision, item.moneda.simbolo));
        total = item.monto - item.comision;
      }

      var decimal = Math.floor((total - Math.floor(total)) * 100);

      fnTabTexto('MONTO GIRO:', $filter('currency')(item.monto, item.moneda.simbolo));
      fnTabTexto(NumLetrasJ.Convierte(parseInt(total).toString()).toUpperCase() + ' Y ' + decimal + '/100 ');
    }

    fnSaltoLinea();
    fnCentrado('____________________');
    fnCentrado('Firma del Beneficiario');
    fnCentrado('Gracias por su preferencia');
    fnCentrado('Verifique su dinero antes de retirarse  de ventanilla');

    fnImprimir();
  };

  var fnBovedaCaja = function (item) {
    if (notReady()) {
      return;
    }
    fnResetPrinter();

    fnCabecera();
    if (item.origen === 'CAJA') {
      fnNegritaCentrado('TRANSACCION CAJA/BOVEDA');
    } else if (item.origen === 'BOVEDA') {
      fnNegritaCentrado('TRANSACCION BOVEDA/CAJA');
    } else {
      alert('Origen no valido');
    }
    fnTabTexto(item.agenciaAbreviatura, 'TRANS.: ' + item.id);
    fnTabTexto('ORIGEN: ' + item.origenTransaccion);
    fnTabTexto('DESTINO: ' + item.destinoTransaccion);
    fnTabTexto('FECHA: ' + $filter('date')(item.fecha, 'dd/MM/yyyy'), 'HORA: ' + $filter('date')(item.hora, 'HH:mm:ss'));

    fnTabTexto('MONEDA: ' + item.moneda.denominacion);
    if (item.moneda.simbolo.charCodeAt(0) === '�') {
      fnTabTexto('MONTO: ' + $filter('currency')(item.monto, chr(238)));
    } else {
      fnTabTexto('MONTO: ' + $filter('currency')(item.monto, item.moneda.simbolo));
    }

    if (item.estadoSolicitud) {
      fnTabTexto('ESTADO SOLICITUD: SOLICITADO');
    } else {
      fnTabTexto('ESTADO SOLICITUD: CANCELADO');
    }
    if (item.estadoConfirmacion) {
      fnTabTexto('ESTADO CONFIRMACION: CONFIRMADO');
    } else {
      fnTabTexto('ESTADO CONFIRMACION: NO CONFIRMADO');
    }

    fnSaltoLinea();
    fnSaltoLinea();
    fnSaltoLinea();

    fnTabTexto('________________', '________________');
    fnTabTexto('Firma cajero', 'Firma jefe caja', 2);
    fnImprimir();
  };

  var fnCajaCaja = function (item) {
    if (notReady()) {
      return;
    }
    fnResetPrinter();

    fnCabecera();
    fnNegritaCentrado('TRANSACCION CAJA/CAJA');
    fnTabTexto(item.agenciaAbreviatura, 'TRANS.: ' + item.id);
    fnTabTexto('ORIGEN: ' + item.cajaOrigenDenominacion);
    fnTabTexto('DESTINO: ' + item.cajaDestinoDenominacion);
    fnTabTexto('FECHA: ' + $filter('date')(item.fecha, 'dd/MM/yyyy'), 'HORA: ' + $filter('date')(item.hora, 'HH:mm:ss'));

    fnTabTexto('MONEDA: ' + item.moneda.denominacion);
    if (item.moneda.simbolo.charCodeAt(0) === '�') {
      fnTabTexto('MONTO: ' + $filter('currency')(item.monto, chr(238)));
    } else {
      fnTabTexto('MONTO: ' + $filter('currency')(item.monto, item.moneda.simbolo));
    }

    if (item.estadoSolicitud) {
      fnTabTexto('ESTADO SOLICITUD: SOLICITADO');
    } else {
      fnTabTexto('ESTADO SOLICITUD: CANCELADO');
    }
    if (item.estadoConfirmacion) {
      fnTabTexto('ESTADO CONFIRMACION: CONFIRMADO');
    } else {
      fnTabTexto('ESTADO CONFIRMACION: NO CONFIRMADO');
    }

    fnSaltoLinea();
    fnSaltoLinea();
    fnSaltoLinea();
    fnTabTexto('________________', '________________');
    fnTabTexto('Firma caja origen', 'Firma caja destino', 2);
    fnImprimir();
  };

  var fnPendiente = function (item) {
    if (notReady()) {
      return;
    }
    fnResetPrinter();

    fnCabecera();
    fnNegritaCentrado('PENDIENTE');

    fnTabTexto('AGENCIA: ' + item.agenciaAbreviatura);
    fnTabTexto('PENDIENTE: ' + item.idPendienteCaja);
    fnTabTexto('T.PENDIENTE: ' + item.tipoPendiente);
    fnTabTexto('FECHA: ' + $filter('date')(item.fecha, 'dd/MM/yyyy'), 'HORA: ' + $filter('date')(item.hora, 'HH:mm:ss'));
    fnTabTexto('MONEDA: ' + item.moneda.denominacion);
    fnTabTexto('MONTO: ' + item.moneda.simbolo + $filter('number')(item.monto, 2));
    fnTabTexto('CAJA: ' + item.cajaDenominacion + item.cajaAbreviatura);
    fnTabTexto('TRABAJADOR: ' + item.trabajadorCrea);

    if (!angular.isUndefined(item.observacion)) {
      fnTabTexto('OBSERVACION: ' + item.observacion);
    }

    fnSaltoLinea();
    fnSaltoLinea();
    fnTabTexto('________________', '________________');
    fnTabTexto('JEFE DE CAJA', 'CAJERO', 2);
    fnImprimir();
  };

  var fnCajaResumen = function (item) {
    if (notReady()) {
      return;
    }
    fnResetPrinter();

    fnCabecera();
    fnNegritaCentrado('RESUMEN DE OPERACIONES');

    fnTabTexto('AGENCIA: ' + item.agencia, 'CAJA: ' + item.caja);
    fnTabTexto('FEC.APERT.: ' + $filter('date')(item.fechaApertura, 'dd/MM/yyyy'), 'HORA.APERT.: ' + $filter('date')(item.horaApertura, 'HH:mm:ss'));
    fnTabTexto('FEC.CIERRE.: ' + $filter('date')(item.fechaCierre, 'dd/MM/yyyy'), 'HORA.CIERRE.: ' + $filter('date')(item.horaCierre, 'HH:mm:ss'));
    fnTabTexto('TRABAJADOR: ' + item.trabajador);
    fnSaltoLinea();

    fnTabTexto('DEPOSITOS (TOTAL): ' + (item.depositosAporte + item.depositosLibre + item.depositosPlazoFijo + item.depositosRecaudadora));
    fnTabTexto('C.LIBRE: ' + item.depositosLibre, 'C.P.FIJO:' + item.depositosPlazoFijo);
    fnTabTexto('C.RECAUDADORA:' + item.depositosRecaudadora);
    fnSaltoLinea();

    fnTabTexto('RETIROS (TOTAL): ' + (item.retirosAporte + item.retirosLibre + item.retirosPlazoFijo + item.retirosRecaudadora));
    fnTabTexto('C.LIBRE: ' + item.retirosLibre, 'C.P.FIJO: ' + item.retirosPlazoFijo);
    fnTabTexto('C.RECAUDADORA:' + item.retirosRecaudadora);
    fnSaltoLinea();

    fnTabTexto('COMPRA/VENTA (TOTAL): ' + (item.compra + item.venta));
    fnTabTexto('COMPRA: ' + item.compra, 'VENTA: ' + item.venta);
    fnSaltoLinea();

    fnTabTexto('TRANS. EXTORNADOS (TOTAL): ' + (item.transExtornadoDepositoRetiro + item.transExtornadoCompraVenta + item.transExtornadoAporte + item.transExtornadoCheque));
    fnTabTexto('DEPOSITO/RETIRO:' + item.transExtornadoDepositoRetiro);
    fnTabTexto('COMPRA/VENTA:' + item.transExtornadoCompraVenta);
    fnTabTexto('CHEQUE:' + item.transExtornadoCheque);
    fnSaltoLinea();

    fnTabTexto('TRANS. MAYOR CUANTIA(TOTAL): ' + (item.depositoMayorCuantia + item.retiroMayorCuantia + item.compraVentaMayorCuantia));
    fnTabTexto('DEPOSITOS:' + item.depositoMayorCuantia, 'RETIROS:' + item.retiroMayorCuantia);
    fnTabTexto('COMPRA/VENTA:' + item.compraVentaMayorCuantia);
    fnSaltoLinea();

    fnTabTexto('TRANS. CAJA-CAJA(TOTAL): ' + (item.enviadoCajaCaja + item.recibidoCajaCaja));
    fnTabTexto('ENVIADOS:' + item.enviadoCajaCaja, 'RECIBIDOS:' + item.recibidoCajaCaja);
    fnSaltoLinea();

    fnTabTexto('TRANS. CAJA-BOVEDA(TOTAL): ' + (item.enviadoBovedaCaja + item.recibidoBovedaCaja));
    fnTabTexto('ENVIADOS:' + item.enviadoBovedaCaja, 'RECIBIDOS:' + item.recibidoBovedaCaja);
    fnSaltoLinea();

    fnTabTexto('CIERRE CAJA(PENDIENTES):');
    fnTabTexto('SOBRANTE:' + item.pendienteSobrante, 'FALTANTE:' + item.pendienteFaltante);

    fnSaltoLinea();
    fnSaltoLinea();
    fnTabTexto('________________', '________________');
    fnTabTexto('CAJERO', 'JEFE DE CAJA', 2);
    fnImprimir();
  };

  var fnCajaBalance = function (item) {
    if (notReady()) {
      return;
    }
    fnResetPrinter();

    fnCabecera();
    fnNegritaCentrado('BALANCE CAJA');

    fnTabTexto('AGENCIA: ' + item.agencia, 'CAJA: ' + item.caja);
    fnTabTexto('FEC.APERT.: ' + $filter('date')(item.fechaApertura, 'dd/MM/yyyy'), 'HORA.APERT.: ' + $filter('date')(item.horaApertura, 'HH:mm:ss'));
    fnTabTexto('FEC.CIERRE.: ' + $filter('date')(item.fechaCierre, 'dd/MM/yyyy'), 'HORA.CIERRE.: ' + $filter('date')(item.horaCierre, 'HH:mm:ss'));
    fnTabTexto('TRABAJADOR: ' + item.trabajador);
    fnSaltoLinea();

    fnTabTexto3('Denominacion', 'Cantidad', 'Subtotal');

    for (var i = 0; i < item.detalle.length; i++) {
      fnTabTexto3($filter('currency')(item.detalle[i].valor, ''), item.detalle[i].cantidad.toString(), $filter('currency')(item.detalle[i].valor * item.detalle[i].cantidad, item.moneda.simbolo));
    }

    fnSaltoLinea();
    fnTabTexto('SALDO AYER: ' + $filter('currency')(item.saldoAyer, item.moneda.simbolo));
    fnTabTexto('ENTRADAS: ' + $filter('currency')(item.entradas, item.moneda.simbolo));
    fnTabTexto('SALIDAS: ' + $filter('currency')(item.salidas, item.moneda.simbolo));
    fnTabTexto('SOBRANTES: ' + $filter('currency')(item.sobrante, item.moneda.simbolo));
    fnTabTexto('FALTANTES: ' + $filter('currency')(item.faltante, item.moneda.simbolo));
    fnTabTexto('SALDO X DEVOLVER: ' + $filter('currency')(item.porDevolver, item.moneda.simbolo));

    fnSaltoLinea();
    fnSaltoLinea();
    fnTabTexto('________________', '________________');
    fnTabTexto('CAJERO', 'JEFE DE CAJA', 2);
    fnImprimir();
  };

  return {
    imprimirConsultaEstadoCuenta: fnConsultaEstadoCuenta,

    imprimirVoucherAporte: fnCuentaAporte,
    imprimirVoucherCompraVenta: fnCompraVenta,
    imprimirVoucherCuentaPersonal: fnCuentaPersonal,
    imprimirVoucherTransferencia: fnTransferencia,
    imprimirVoucherCheque: fnCheque,
    imprimirVoucherGiro: fnGiro,

    imprimirVoucherTransaccionBovedaCaja: fnBovedaCaja,
    imprimirVoucherTransaccionCajaCaja: fnCajaCaja,

    imprimirVoucherPendiente: fnPendiente,

    imprimirVoucherCajaResumen: fnCajaResumen,
    imprimirVoucherCajaBalance: fnCajaBalance,

    imprimirPrueba: fnPrueba
  };


});
/* jshint ignore:end */
