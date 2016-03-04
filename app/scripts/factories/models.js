'use strict';

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

//For configure base path or the web services
angular.module(ApplicationConfiguration.applicationModuleName)

  .provider('form', function () {
    this.restUrl = 'http://localhost';
    this.$get = function () {
      var restUrl = this.restUrl;
      return {
        getRestUrl: function () {
          return restUrl;
        }
      }
    };
    this.setRestUrl = function (restUrl) {
      this.restUrl = restUrl;
    };
  })

  .factory('FormRestangular', ['Restangular', 'form', function (Restangular, form) {
    return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(form.getRestUrl());
    });
  }])

  .factory('SCForm', ['FormRestangular', function (FormRestangular) {
    var extendMethod = {
      $active: function () {
        return FormRestangular.one(this.$getBasePath(), this.id).all('active').post();
      }
    };

    var SCForm = new RestObject('forms', FormRestangular, extendMethod);

    SCForm.SCSection = function () {
      var extendMethod = {};
      var SCSection = new RestObject(this.$concatSubResourcePath('sections'), FormRestangular, extendMethod);

      SCSection.SCQuestion = function () {
        var extendMethod = {};
        var SCQuestion = RestObject(this.$concatSubResourcePath('questions'), FormRestangular, extendMethod);

        SCQuestion.SCAnswer = function () {
          var extendMethod = {};
          var SCAnswer = RestObject(this.$concatSubResourcePath('answers'), FormRestangular, extendMethod);

          return SCAnswer;
        };

        return SCQuestion;
      };

      return SCSection;
    };

    return SCForm;
  }])

  .factory('SCFormAnswer', ['FormRestangular', function (FormRestangular) {
    var extendMethod = {
      /*$getCuentaAporte: function () {
       return CertambRestangular.one(this.$getBasePath(), this.id).customGET('cuentaAporte', {});
       }*/
    };

    var SCFormAnswer = new RestObject('formAnswers', FormRestangular, extendMethod);

    SCFormAnswer.SCAnswer = function () {
      var extendMethod = {
        $saveAll: function (objects) {
          return FormRestangular.one(this.$getBasePath(), this.id).all('save').post(objects);
        }
      };
      var SCAnswer = new RestObject(this.$concatSubResourcePath('answers'), FormRestangular, extendMethod);

      /*SCSection.SCQuestion = function(){
       var extendMethod = {};
       return new RestObject(this.$concatSubResourcePath('questions'), FormRestangular, extendMethod);
       };*/

      return SCAnswer;
    };

    return SCFormAnswer;
  }]);
