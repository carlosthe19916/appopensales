'use strict';

// Directives for common buttons
angular.module(ApplicationConfiguration.applicationModuleName)
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

