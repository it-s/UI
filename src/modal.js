angular.module('com.likalo.ui')
  .factory('uiDialog', ['ngDialog',
    function (ngDialog) {
      return {
        alert: function (title, message) {
          var infoClass;
          title = title || 'Alert';
          message = message || '';
          return ngDialog.open({
            plain: true,
            closeByNavigation: true,
            className: 'UI-modal UI-modal--alert',
            template: '<aside class="UI-info-block--alert"><svg class="UI-info-block--decorator"><rect class="UI-decorator--base" height="100%"></rect><use xmlns:xlink="http://www.w3.org/1999/xlink" class="UI-decorator--icon" ui-icon-xlink-href="alert" xlink:href="#icon--alert"></use></svg><p class="UI-info-block--content"><strong>' + title + '</strong><br/>' + message + '</p></aside>'
          });
        },
        modal: function (template, controller, more) {
          return ngDialog.openConfirm(angular.extend({
            showClose: false,
            closeByEscape: false,
            closeByDocument: false,
            className: 'UI-modal UI-modal--dialog',
            template: template,
            controller: controller
          }, more));
        },
        view: function (template, controller, more) {
          return ngDialog.open(angular.extend({
            showClose: false,
            closeByEscape: true,
            closeByDocument: true,
            closeByNavigation: true,
            className: 'UI-modal UI-modal--view',
            template: template,
            controller: controller
          }, more));
        }
      };
    }
  ]);