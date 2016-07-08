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
            template: '<aside class="UI-info-block--alert"><svg class="UI-info-block--decorator"><rect class="UI-decorator--base" height="100%"></rect><use xmlns:xlink="http://www.w3.org/1999/xlink" class="UI-decorator--icon" xlink:href="#icon--block-alert"></use></svg><p class="UI-info-block--content"><strong>' + title + '</strong><br/>' + message + '</p></aside>'
          });
        },
        confirm: function (title, message, buttons) {
          var infoClass;
          title = title || 'Alert';
          message = message || '';
          buttons = buttons || {reject: 'Cancel', accept: 'Ok'}
          return ngDialog.openConfirm({
            plain: true,
            closeByNavigation: true,
            className: 'UI-modal UI-modal--dialog',
            template: '<header class="UI-modal--header"><strong>'+title+'</strong></header><div class="UI-modal--content">'+message+'</div><footer class="UI-modal--footer pure-menu pure-menu-horizontal pure-menu-justified"><ul class="pure-menu-list"><li class="pure-menu-item"><a class="pure-menu-link" ng-click="closeThisDialog(0)">'+buttons.reject+'</a></li><li class="pure-menu-separator"></li><li class="pure-menu-item"><a class="pure-menu-link UI-modal--primary" ng-click="confirm(1)">'+buttons.accept+'</a></li></ul></footer>'
          });
        },
        modal: function (template, controller, more) {
          return ngDialog.openConfirm(angular.extend({
            closeByDocument: false,
            closeByNavigation: true,
            className: 'UI-modal UI-modal--dialog',
            template: template,
            controller: controller
          }, more));
        },
        view: function (template, controller, more) {
          return ngDialog.open(angular.extend({
            showClose: false,
            closeByEscape: false,
            closeByDocument: false,
            closeByNavigation: true,
            className: 'UI-modal UI-modal--view',
            template: template,
            controller: controller
          }, more));
        }
      };
    }
  ]);