angular.module('com.likalo.ui')
  .factory('$uiServices', [
    '$window',
    '$rootScope',
    function ($window, $rootScope) {
      var tick = false,
        scroll = {
          x: $window.scrollX,
          y: $window.scrollY
        },
        size = {
          width: $window.outerWidth,
          height: $window.outerHeight
        };

       function notify(event){
        if (!tick) {
          $window.requestAnimationFrame(function () {
            $rootScope.$broadcast(event, scroll);
            tick = false;
          });
        }
        tick = true;
       }

      function windowScroll(e) {
        scroll.x = $window.scrollX;
        scroll.y = $window.scrollY;
        notify('$windowScroll');
      }

      function windowResize(e) {
        size.width = $window.outerWidth;
        size.height = $window.outerHeight;
        notify('$windowResize');
      }

      $window.addEventListener('scroll', windowScroll.bind(this));
      $window.addEventListener('resize', windowResize.bind(this));

      return {
        trackScrollEvents: function (el) {

        }
      };
    }
  ]);