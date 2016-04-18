'use strict';

angular.module(ApplicationConfiguration.applicationModuleName).provider('repeid', function () {

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



angular.module(ApplicationConfiguration.applicationModuleName).factory('RepeidRestangular', ['Restangular', 'repeid', function(Restangular, repeid) {
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(repeid.getRestUrl());
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

    function extendObject(obj, modelMethods){
        angular.extend(obj, modelMethods);
    }

    function extendArray(obj, modelMethods){
        angular.forEach(obj, function (row) {
            if (angular.isObject(row)) {
                if (!angular.isArray(row)) {
                    extendObject(row, modelMethods);
                }
            }
        });
    }

    function automaticExtend(obj, modelMethods){
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

angular.module(ApplicationConfiguration.applicationModuleName).factory('RPEstadoCivil', ['RepeidRestangular', function (RepeidRestangular) {
    var estadosCivilesResource = new RestObject('estadosCiviles', RepeidRestangular);
    return estadosCivilesResource;
}]);

angular.module(ApplicationConfiguration.applicationModuleName).factory('RPSexo', ['RepeidRestangular', function (RepeidRestangular) {
    var sexosResource = new RestObject('sexos', RepeidRestangular);
    return sexosResource;
}]);

angular.module(ApplicationConfiguration.applicationModuleName).factory('RPTipoEmpresa', ['RepeidRestangular', function (RepeidRestangular) {
    var sexosResource = new RestObject('tiposEmpresa', RepeidRestangular);
    return sexosResource;
}]);

angular.module(ApplicationConfiguration.applicationModuleName).factory('RPTipoPersona', ['RepeidRestangular', function (RepeidRestangular) {
    var tiposPersonaResource = new RestObject('tiposPersona', RepeidRestangular);
    return tiposPersonaResource;
}]);

angular.module(ApplicationConfiguration.applicationModuleName).factory('RPTipoDocumento', ['RepeidRestangular', function (RepeidRestangular) {
    var extendMethod = {
        $new: function (abreviatura) {
            return angular.extend({abreviatura: abreviatura}, this.$getModelMethods());
        },
        $build: function () {
            return angular.extend({abreviatura: undefined}, this.$getModelMethods(), {
                $save: function () {
                    return RepeidRestangular.all(this.$getBasePath()).post(this);
                }
            });
        },
        $save: function () {
            return RepeidRestangular.one(this.$getBasePath(), this.abreviatura).customPUT(RepeidRestangular.copy(this), '', {}, {});
        },
        $enable: function () {
            return RepeidRestangular.one(this.$getBasePath(), this.abreviatura).all('enable').post();
        },
        $disable: function () {
            return RepeidRestangular.one(this.$getBasePath(), this.abreviatura).all('disable').post();
        },
        $remove: function () {
            return RepeidRestangular.one(this.$getBasePath(), this.abreviatura).remove();
        }
    };

    var tiposDocumentoResource = new RestObject('tipoDocumentos', RepeidRestangular, extendMethod);
    return tiposDocumentoResource;
}]);

angular.module(ApplicationConfiguration.applicationModuleName).factory('RPPersonaNatural', ['RepeidRestangular', 'Upload', function (RepeidRestangular, Upload) {

    var extendMethod = {
        $setFoto: function (file) {
            var urlFile = RepeidRestangular.one(this.$getBasePath(), this.id).all('foto').getRestangularUrl();
            return Upload.upload({
                url: urlFile,
                file: file
            });
        },
        $setFirma: function (file) {
            var urlFile = RepeidRestangular.one(this.$getBasePath(), this.id).all('firma').getRestangularUrl();
            return Upload.upload({
                url: urlFile,
                file: file
            });
        }
    };

    var personaNaturalResource = new RestObject('personas/naturales', RepeidRestangular, extendMethod);

    return personaNaturalResource;
}]);

angular.module(ApplicationConfiguration.applicationModuleName).factory('RPPersonaJuridica', ['RepeidRestangular', 'Upload', function (RepeidRestangular) {

    var extendMethod = {};

    var personaJuridicaResource = new RestObject('personas/juridicas', RepeidRestangular, extendMethod);

    /**
     * Accionistas*
     * */
    personaJuridicaResource.RPAccionista = function () {
        var extendMethod = {};

        var accionistaSubResource = new RestObject(this.$concatSubResourcePath('accionistas'), RepeidRestangular, extendMethod);

        return accionistaSubResource;
    };

    return personaJuridicaResource;
}]);
