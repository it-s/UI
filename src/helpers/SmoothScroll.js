angular.module('com.likalo.ui.helpers')
  .directive('smoothScroll', ['$window', '$timeout', function($window, $timeout) {
    var window = $window,
      frequency = 12,
      getElementOffset = function(el) {
        var top = 0, ir = el;
        while (angular.isDefined(ir['offsetParent']) && ir['offsetParent'] !== null) {
          top += ir.offsetTop + (ir.clientTop != null ? ir.clientTop : 0);
          ir = ir.offsetParent;
        }
        return top;
      };
    return {
      restrict: 'A',
      link: function($scope, $el, $attr) {
        var hopCount,
          speed = 300,
          el = $el[0],
          elements;

          function computeHopCount(){
            hopCount = (speed - (speed % frequency)) / frequency;
          }

          function scroll(e) {
            var href, url, id, offset, targetOffset, currentOffset, target = e.currentTarget;
            href = target.attributes.href.value.toString();
            url = href.substr(0, href.indexOf('#'));
            id = href.substr(href.indexOf('#') + 1);
            if (angular.isUndefined(id)) return;
            e.preventDefault();
            e.stopPropagation();
            if (window['history'] && angular.isFunction(window.history.pushState))
              window.history.pushState({}, undefined, url + '#' + id); // Change URL for modern browser
            currentOffset = window.pageYOffset !== undefined ? window.pageYOffset : 0
            targetOffset = (target['$smoothScrollOffset'] - currentOffset) / hopCount;
            for (var i = 1; i <= hopCount; i++) {
              (function() {
                var position = targetOffset * i;
                $timeout(function() {
                  window.scrollTo(0, position + currentOffset);
                }, frequency * i);
              })();
            }
            return true;
          }

        //Keep track of attribute changes
        $attr.$observe('smoothScroll', function(value) {
          if (!value) return;
          speed = Number(value);
          computeHopCount();
        });

        $scope.$on(
          "$destroy",
          function handleDestroyEvent() {
            angular.forEach(elements, function(el) {
              delete el['$smoothScrollOffset'];
              el.removeEventListener('click', scroll);
            });
          }
        );

        elements = el.getElementsByTagName('a');
        angular.forEach(elements, function(a) {
          var href, id, url, target;
          try {
            href = a.attributes.href.value.toString();
            if (href && href.length > 1 && href.indexOf('#') == 0) {
              id = href.substr(href.indexOf('#') + 1);
              target = document.getElementById(id);
              url = href.substr(0, href.indexOf('#'));
              a.addEventListener('click', scroll);
              a['$smoothScrollOffset'] = getElementOffset(target);
            }
          } catch (err) {
            // console.log(err);
            return;
          }
        });
        computeHopCount();
      }
    };
  }]);
