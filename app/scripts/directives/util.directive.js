'use strict';

// Directives for common buttons
angular.module(ApplicationConfiguration.applicationModuleName)
  .filter('si_no', function () {
    return function (input, mode) {
      var defaultResult = ['Si', 'No'];
      var modeOneResult = ['Activo', 'Inactivo'];
      var modeTwoResult = ['Abierto', 'Cerrado'];
      var modeTreeResult = ['Descongelado', 'Congelado'];

      var modeFourResult = ['Solicitado', 'Cancelado'];
      var modeFiveResult = ['Confirmado', 'No confirmado'];

      var result = defaultResult;
      if (mode) {
        if (mode.toLowerCase() === 'si') {
          result = defaultResult;
        } else if (mode.toLowerCase() === 'activo') {
          result = modeOneResult;
        } else if (mode.toLowerCase() === 'abierto') {
          result = modeTwoResult;
        } else if (mode.toLowerCase() === 'congelado') {
          result = modeTreeResult;
        } else if (mode.toLowerCase() === 'solicitado') {
          result = modeFourResult;
        } else if (mode.toLowerCase() === 'confirmado') {
          result = modeFiveResult;
        } else {
          result = defaultResult;
        }
      }

      if (input) {
        return result[0];
      }
      return result[1];
    };
  })
  .directive('sgSave', ['$compile', function ($compile) {
    return {
      restrict: 'A',
      link: function ($scope, elem, attr, ctrl) {
        elem.addClass('btn btn-primary');
        elem.attr('type","submit');
        elem.bind('click', function () {
          $scope.$apply(function () {
            var form = elem.closest('form');
            if (form && form.attr('name')) {
              var ngValid = form.find('.ng-valid');
              if ($scope[form.attr('name')].$valid) {
                //ngValid.removeClass('error');
                ngValid.parent().removeClass('has-error');
                /* jshint -W069 */
                if(attr.onSave) $scope[attr.onSave]();
                else $scope['save']();

              } else {
                console.log('Missing or invalid field(s). Please verify the fields in red.');
                //ngValid.removeClass('error');
                ngValid.parent().removeClass('has-error');

                var ngInvalid = form.find('.ng-invalid');
                //ngInvalid.addClass('error');
                ngInvalid.parent().addClass('has-error');
              }
            }
          });
        });
      }
    };
  }]).directive('sgReset', ['$compile', function ($compile) {
    return {
      restrict: 'A',
      link: function ($scope, elem, attr, ctrl) {
        elem.addClass('btn btn-default');
        elem.attr('type', 'submit');
        elem.bind('click', function () {
          $scope.$apply(function () {
            var form = elem.closest('form');
            if (form && form.attr('name')) {
              form.find('.ng-valid').removeClass('error');
              form.find('.ng-invalid').removeClass('error');
              /* jshint -W069 */
              $scope['reset']();
            }
          });
        });
      }
    };
  }]).directive('sgCancel', ['$compile', function ($compile) {
    return {
      restrict: 'A',
      link: function ($scope, elem, attr, ctrl) {
        elem.addClass('btn btn-default');
        elem.attr('type', 'submit');
      }
    };
  }]).directive('sgDelete', ['$compile', function ($compile) {
    return {
      restrict: 'A',
      link: function ($scope, elem, attr, ctrl) {
        elem.addClass('btn btn-danger');
        elem.attr('type', 'submit');
      }
    };
  }]);

