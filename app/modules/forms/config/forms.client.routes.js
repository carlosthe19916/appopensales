'use strict';

// Setting up route
angular.module('forms').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/forms/app', '/forms/app/form');
    $urlRouterProvider.when('/forms/app/form', '/forms/app/form/search');

    $urlRouterProvider.when('/forms/app/form/edit/:form', '/forms/app/form/edit/:form/summary');

    $urlRouterProvider.when('/forms/app/formAnswer', '/forms/app/formAnswer/search');
    $urlRouterProvider.when('/forms/app/formAnswer/search', '/forms/app/formAnswer/search/all');

    $urlRouterProvider.when('/forms/app/result', '/forms/app/result/search');

    $stateProvider
      .state('forms', {
        abstract: true,
        url: '/forms',
        template: '<div ui-view></div>',
        controller: 'FormsController'
      })
      .state('forms.home', {
        url: '/home',
        templateUrl: 'modules/forms/views/index.html',
        ncyBreadcrumb: {
          label: 'Index'
        }
      })
      .state('forms.app', {
        url: '/app',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })

      //Direccion regional
      .state('forms.app.form', {
        url: '/form',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('forms.app.formAnswer', {
        url: '/formAnswer',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('forms.app.result', {
        url: '/result',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })

      .state('forms.app.form.search', {
        url: '/search',
        templateUrl: 'modules/forms/views/form/form-search.html',
        controller: 'Forms.Form.SearchController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('forms.app.form.create', {
        url: '/create',
        templateUrl: 'modules/forms/views/form/form-create.html',
        controller: 'Forms.Form.CreateController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Crear encuesta',
          parent: 'forms.app.form.search'
        }
      })
      .state('forms.app.form.edit', {
        url: '/edit/:form',
        templateUrl: 'modules/forms/views/form/form-edit.html',
        resolve: {
          form: function ($state, $stateParams, SCForm) {
            return SCForm.$find($stateParams.form);
          }
        },
        controller: 'Forms.Form.EditController',
        ncyBreadcrumb: {
          label: 'Editar encuesta',
          parent: 'forms.app.form.search'
        }
      })
      .state('forms.app.form.edit.summary', {
        url: '/summary',
        templateUrl: 'modules/forms/views/form/form-edit-summary.html',
        controller: 'Forms.Form.Edit.SummaryController',
        resolve: {
        },
        ncyBreadcrumb: {
          skip: true
        }
      })
      .state('forms.app.form.edit.principaldata', {
        url: '/principaldata',
        templateUrl: 'modules/forms/views/form/form-edit-principaldata.html',
        controller: 'Forms.Form.Edit.PrincipalDataController',
        resolve: {
        },
        ncyBreadcrumb: {
          label: 'Datos principales'
        }
      })
      .state('forms.app.form.edit.builder', {
        url: '/builder',
        templateUrl: 'modules/forms/views/form/form-edit-builder.html',
        controller: 'Forms.Form.Edit.BuilderController',
        resolve: {
        },
        ncyBreadcrumb: {
          label: 'Editor'
        }
      })

      .state('forms.app.formAnswer.search', {
        url: '/search',
        templateUrl: 'modules/forms/views/formAnswer/form-search.html',
        controller: 'Forms.FormAnswer.SearchController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('forms.app.formAnswer.search.all', {
        url: '/all',
        templateUrl: 'modules/forms/views/formAnswer/form-search-all.html',
        controller: 'Forms.FormAnswer.Search.AllController',
        resolve: {
        },
        ncyBreadcrumb: {
          label: 'Todos'
        }
      })
      .state('forms.app.formAnswer.search.saved', {
        url: '/saved',
        templateUrl: 'modules/forms/views/formAnswer/form-search-saved.html',
        controller: 'Forms.FormAnswer.Search.SavedController',
        resolve: {
        },
        ncyBreadcrumb: {
          label: 'Guardados'
        }
      })
      .state('forms.app.formAnswer.edit', {
        url: '/edit/:formAnswer',
        templateUrl: 'modules/forms/views/formAnswer/form-edit.html',
        resolve: {
          formAnswer: function ($state, $stateParams, SCFormAnswer) {
            return SCFormAnswer.$find($stateParams.formAnswer);
          }
        },
        controller: 'Forms.FormAnswer.EditController',
        ncyBreadcrumb: {
          label: 'Editar respuesta',
          parent: 'forms.app.formAnswer.search'
        }
      })

      .state('forms.app.result.search', {
        url: '/search',
        templateUrl: 'modules/forms/views/result/form-search.html',
        controller: 'Forms.Result.SearchController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('forms.app.result.edit', {
        url: '/edit/:form',
        templateUrl: 'modules/forms/views/result/form-edit.html',
        resolve: {
          form: function ($state, $stateParams, SCForm) {
            return SCForm.$find($stateParams.form);
          }
        },
        controller: 'Forms.Result.EditController',
        ncyBreadcrumb: {
          label: 'Editar resultados',
          parent: 'forms.app.result.search'
        }
      })
      .state('forms.app.result.edit.summary', {
        url: '/summary',
        templateUrl: 'modules/forms/views/result/form-edit-summary.html',
        controller: 'Forms.Result.Edit.SummaryController',
        resolve: {
        },
        ncyBreadcrumb: {
          skip: true
        }
      });
  }
]);
