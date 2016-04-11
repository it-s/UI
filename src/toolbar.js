angular.module('com.likalo.ui')
 .directive('appToolbar', ['$window', function($window) {
  function findApp($el){
   var el = $el;
   while(el = el.parent()){
    if(el.hasClass('app')) return el;
   }
   return undefined;
  }
  return {
   restrict: 'C',
   link: function($scope, $el, $attrs) {
    var affixed = false,
     $app = findApp($el),
     $nav = $el.children(),
     width = $el[0].clientWidth,
     height = $el[0].clientHeight;

    function observe() {
     if (!affixed && $app[0].scrollTop > height) {
      width = $el[0].clientWidth;
      $nav.attr('style', 'width:' + width + 'px;');
      $el.addClass('app-toolbar--affixed');
      affixed = true;
     } else if (affixed && $app[0].scrollTop < height) {
      $el.removeClass('app-toolbar--affixed');
      $nav.attr('style', 'width: 100%');
      affixed = false;
     }
    }

    $app.on('scroll', observe);
    $scope.$on(
     "$destroy",
     function handleDestroyEvent() {
      $app.off('scroll', observe);
     }
    );

    observe();
   }
  };
 }])
