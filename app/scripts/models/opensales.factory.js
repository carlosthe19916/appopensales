'use strict';

angular.module(ApplicationConfiguration.applicationModuleName).provider('opensales', function () {

  this.restUrl = 'http://localhost';

  this.$get = function () {
    var restUrl = this.restUrl;
    return {
      getRestUrl: function () {
        return restUrl;
      }
    };
  };

  this.setRestUrl = function (restUrl) {
    this.restUrl = restUrl;
  };
});


angular.module(ApplicationConfiguration.applicationModuleName).factory('OpensalesRestangular', ['Restangular', 'opensales', function (Restangular, opensales) {
  return Restangular.withConfig(function (RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl(opensales.getRestUrl());
  });
}]);


var RestObject = function (path, restangular, extendMethods) {
  var modelMethods = {

    /**
     * Retorna url*/
    $getModelMethods: function () {
      return modelMethods;
    },

    /**
     * Retorna url*/
    $getBasePath: function () {
      return path;
    },
    /**
     * Retorna la url completa del objeto*/
    $getAbsoluteUrl: function () {
      return restangular.one(path, this.id).getRestangularUrl();
    },
    /**
     * Concatena la url de subresource con la url base y la retorna*/
    $concatSubResourcePath: function (subResourcePath) {
      return this.$getBasePath() + '/' + this.id + '/' + subResourcePath;
    },


    $new: function (id) {
      return angular.extend({id: id}, modelMethods);
    },
    $build: function () {
      return angular.extend({id: undefined}, modelMethods, {
        $save: function () {
          return restangular.all(path).post(this);
        }
      });
    },

    $search: function (queryParams) {
      return restangular.one(path).all('search').post(queryParams);
    },
    $getAll: function (queryParams) {
      return restangular.all(path).getList(queryParams);
    },

    $find: function (id) {
      return restangular.one(path, id).get();
    },
    $save: function () {
      return restangular.one(path, this.id).customPUT(restangular.copy(this), '', {}, {});
    },
    $saveSent: function (obj) {
      return restangular.all(path).post(obj);
    },

    $enable: function () {
      return restangular.one(path, this.id).all('enable').post();
    },
    $disable: function () {
      return restangular.one(path, this.id).all('disable').post();
    },
    $remove: function () {
      return restangular.one(path, this.id).remove();
    }
  };

  modelMethods = angular.extend(modelMethods, extendMethods);

  function extendObject(obj, modelMethods) {
    angular.extend(obj, modelMethods);
  }

  function extendArray(obj, modelMethods) {
    angular.forEach(obj, function (row) {
      if (angular.isObject(row)) {
        if (!angular.isArray(row)) {
          extendObject(row, modelMethods);
        }
      }
    });
  }

  function automaticExtend(obj, modelMethods) {
    if (angular.isDefined(obj)) {
      if (angular.isObject(obj)) {
        if (angular.isArray(obj)) {
          extendArray(obj, modelMethods);
        } else {
          if (angular.isDefined(obj.items) && angular.isArray(obj.items)) {
            extendArray(obj.items, modelMethods);
          } else {
            extendObject(obj, modelMethods);
          }
        }
      }
    }
  }

  restangular.extendModel(path, function (obj) {
    automaticExtend(obj, modelMethods);
    return obj;
  });

  restangular.extendCollection(path, function (collection) {
    automaticExtend(collection, modelMethods);
    return collection;
  });

  return modelMethods;
};

/*angular.module(ApplicationConfiguration.applicationModuleName).factory('OSOFicina', ['OpensalesRestangular', function (OpensalesRestangular) {
 var oficinasResource = new RestObject('OficinasService.svc/oficinas', OpensalesRestangular);
 return oficinasResource;
 }]);*/

angular.module(ApplicationConfiguration.applicationModuleName).factory('OSPuntoVenta', ['OpensalesRestangular', function (OpensalesRestangular) {
  var extendedMethods = {};
  var expedientesResource = new RestObject('com.Siacpi.Ventas.Services/ExpedientesService.svc/expedientes', OpensalesRestangular, extendedMethods);

  expedientesResource.OSCaja = function () {
    var extendMethod = {};
    var cajaSubResource = new RestObject(this.$concatSubResourcePath('cuentas'), OpensalesRestangular, extendMethod);
    return cajaSubResource;
  };

  expedientesResource.OSTrabajador = function () {
    var extendMethod = {};
    var trabajadorSubResource = new RestObject(this.$concatSubResourcePath('trabajadores'), OpensalesRestangular, extendMethod);
    return trabajadorSubResource;
  };

  return expedientesResource;
}]);

angular.module(ApplicationConfiguration.applicationModuleName).factory('OSTipoDocumento', ['OpensalesRestangular', function (OpensalesRestangular) {
  var extendedMethods = {};

  var tiposDocumentoResource = new RestObject('com.Siacpi.Ventas.Services/TiposDocumentoService.svc/tiposDocumento', OpensalesRestangular, extendedMethods);

  return tiposDocumentoResource;
}]);

angular.module(ApplicationConfiguration.applicationModuleName).factory('OSPersona', ['OpensalesRestangular', function (OpensalesRestangular) {
  var extendedMethods = {};

  var personasResource = new RestObject('com.Siacpi.Ventas.Services/PersonasService.svc/personas', OpensalesRestangular, extendedMethods);

  return personasResource;
}]);

angular.module(ApplicationConfiguration.applicationModuleName).factory('OSCaja', ['OpensalesRestangular', function (OpensalesRestangular) {
  var extendedMethods = {};

  var cuentasResource = new RestObject('com.Siacpi.Ventas.Services/CuentasService.svc/cuentas', OpensalesRestangular, extendedMethods);

  return cuentasResource;
}]);

angular.module(ApplicationConfiguration.applicationModuleName).factory('OSTrabajador', ['OpensalesRestangular', function (OpensalesRestangular) {
  var extendedMethods = {};

  var trabajadoresResource = new RestObject('com.Siacpi.Ventas.Services/TrabajadoresService.svc/trabajadores', OpensalesRestangular, extendedMethods);

  trabajadoresResource.OSCaja = function () {
    var extendMethod = {};
    var cajaSubResource = new RestObject(this.$concatSubResourcePath('cuentas'), OpensalesRestangular, extendMethod);
    return cajaSubResource;
  };

  return trabajadoresResource;
}]);
