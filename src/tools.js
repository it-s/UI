angular.module('com.likalo.ui')
  .factory('$uiTools', [
    '$timeout',
    '$document',
    function ($timeout, $document) {

      var ngModelNoop = function () {
        this.$viewValue = undefined;
        this.$modelValue = undefined;
        this.$formatters = [];
        this.$parsers = [];
      };
      ngModelNoop.prototype = {
        $parse: function (value) {
          var $modelValue = value;
          angular.forEach(this.$parsers,
            function parse(parser) {
              $modelValue = parser(value);
            });
          this.$modelValue = value;
        },
        $render: angular.noop,
        $setViewValue: function (value) {
          this.$viewValue = value;
          this.$parse(value);
        }
      };

      function elementUnwrap(el) {
        if (angular.isUndefined(el)) return;
        if (angular.isDefined(el['nodeName'])) return el;
        return el[0];
      }

      function findElementBySelector(selector, $el) {
        var document = $document[0],
            el = elementUnwrap($el);
        if (selector[0] === "#") return angular.element(
          document.getElementById(selector.substr(1))
        );
        if (el) {
          if (selector === ":parent") return el.parentElement;
          if (selector === ":previous") return el.previousSibling;
          if (selector === ":next") return el.nextSibling;
          if (selector[0] === ".") return angular.element(
            el.getElementsByClassName(selector.substr(1))
          );
          return angular.element(
            el.getElementsByTagName(selector)
          );
        } else {
          if (selector[0] === ".") return angular.element(
            document.getElementsByClassName(selector.substr(1))
          );
          return angular.element(
            document.getElementsByTagName(selector)
          );
        }
      }

      function debounce (delay, no_trailing, callback, debounce_mode) {
        var timeout_id,
        last_exec = 0;
        
        if (typeof no_trailing !== 'boolean') {
          debounce_mode = callback;
          callback = no_trailing;
          no_trailing = undefined;
        }
        
        var wrapper = function () {
          var that = this,
              elapsed = +new Date() - last_exec,
              args = arguments,
              exec = function () {
                last_exec = +new Date();
                callback.apply(that, args);
              },
              clear = function () {
                timeout_id = undefined;
              };

          if (debounce_mode && !timeout_id) { exec(); }
          if (timeout_id) { $timeout.cancel(timeout_id); }
          if (debounce_mode === undefined && elapsed > delay) {
            exec();
          } else if (no_trailing !== true) {
            timeout_id = $timeout(debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay);
          }
        };
        
        return wrapper;
      }

      return {
        ngModelNoop: ngModelNoop,
        elementUnwrap: elementUnwrap,
        findElementBySelector: findElementBySelector,
        debounce: debounce
      };
    }
  ]);
