'use strict';

angular.module(ApplicationConfiguration.applicationModuleName)
  .service('SGDialog', ['$uibModal', function ($uibModal) {
    var dialog = {};

    var openDialog = function (title, message, btns) {
      var controller = function ($scope, $uibModalInstance, title, message, btns) {
        $scope.title = title;
        $scope.message = message;
        $scope.btns = btns;

        $scope.ok = function () {
          $uibModalInstance.close();
        };
        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      };
      controller.$inject = ['$scope', '$uibModalInstance', 'title', 'message', 'btns'];

      return $uibModal.open({
        template: '' +
        "<div class=\"modal-header\">\n" +
        "<button type=\"button\" class=\"close\" ng-click=\"cancel()\">\n" +
        "<span class=\"pficon pficon-close\"></span>\n" +
        "</button>\n" +
        "<h4 class=\"modal-title\">{{title}}</h4>\n" +
        "</div>\n" +
        "<div class=\"modal-body\">{{message}}</div>\n" +
        "<div class=\"modal-footer\">\n" +
        "<button type=\"button\" data-ng-class=\"btns.cancel.cssClass\" ng-click=\"cancel()\">{{btns.cancel.label}}</button>\n" +
        "<button type=\"button\" data-ng-class=\"btns.ok.cssClass\" ng-click=\"ok()\">{{btns.ok.label}}</button>\n" +
        "</div>\n" +
        "",
        controller: controller,
        resolve: {
          title: function () {
            return title;
          },
          message: function () {
            return message;
          },
          btns: function () {
            return btns;
          }
        }
      }).result;
    };

    var escapeHtml = function (str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    dialog.confirmDelete = function (name, type, success) {
      var title = 'Eliminar ' + escapeHtml(type.charAt(0).toUpperCase() + type.slice(1));
      var msg = '?Estas seguro de querer eliminar permanentemente el/la ' + type + ' ' + name + '?';
      var btns = {
        ok: {
          label: 'Eliminar',
          cssClass: 'btn btn-danger'
        },
        cancel: {
          label: 'Cancelar',
          cssClass: 'btn btn-default'
        }
      };

      openDialog(title, msg, btns).then(success);
    };

    dialog.confirm = function (title, message, success, cancel) {
      var btns = {
        ok: {
          label: title,
          cssClass: 'btn btn-primary'
        },
        cancel: {
          label: 'Cancelar',
          cssClass: 'btn btn-default'
        }
      };

      openDialog(title, message, btns).then(success, cancel);
    };

    return dialog;
  }]);
