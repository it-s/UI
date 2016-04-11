angular.module('com.likalo.ui')
 .directive('uiTooltip', ['$window', '$document', '$timeout', function($window, $document, $timeout) {
  var $body = $document.find('body');

  function template(text, title) {
   return '<div class="UI-tooltip"><div class="UI-tooltip--container"><header class="UI-tooltip--header">'+title+'</header><label class="UI-tooltip--label">' + text + '</label></div><div class="UI-tooltip--arrow"></div></div>';
  }

  function position(popup, source, position) {
   var windowRect = {
     width: $window.innerWidth,
     height: $window.innerHeight
    },
    sourceRect = elementUnwrap(source).getBoundingClientRect(),
    popupRect = elementUnwrap(popup).getBoundingClientRect(),
    top, left, hint;

   //If position is auto - find the best postion for tooltip
   hint = position != 'auto'? position : (function(){
    if(sourceRect.top + sourceRect.height / 2 > windowRect.width / 2) return 'left';
    else return 'right';
   })();

   //Make sure the position is not out of screen bounds
   if(hint == 'top' && sourceRect.top - popupRect.height < 0) hint = 'bottom';
   if(hint == 'bottom' && sourceRect.top + sourceRect.height > windowRect.height) hint = 'top';
   if(hint == 'left' && sourceRect.left - popupRect.width < 0) hint = 'right';
   if(hint == 'right' && sourceRect.left + sourceRect.width > windowRect.width) hint = 'left';

   switch (hint) {
    case 'top':
     top = sourceRect.top - popupRect.height;
     left = sourceRect.left + sourceRect.width / 2 - popupRect.width / 2;
     break;
    case 'bottom':
     top = sourceRect.top + sourceRect.height;
     left = sourceRect.left + sourceRect.width / 2 - popupRect.width / 2;
     break;
    case 'left':
     top = sourceRect.top + sourceRect.height / 2 - popupRect.height / 2;
     left = sourceRect.left - popupRect.width;
     break;
    case 'right':
     top = sourceRect.top + sourceRect.height / 2 - popupRect.height / 2;
     left = sourceRect.left + sourceRect.width;
     break;
   }

   popup.attr('style', 'top:'+top+'px;left:'+left+'px;');
   popup.addClass('UI-tooltip--'+hint);
  }
  return {
   restrict: 'A',
   link: function($scope, $el, $attrs) {
    var tooltip, hint = 'top', $popup,
     title = $attrs['tooltipTitle'] || '',
     timeout = Number($attrs['tooltipTimeout'] || 0),
     delay = Number($attrs['tooltipDelay'] || 500);

    function render(e) {
     var i = $document;
     switch (e.type) {
      case 'mouseover':
       if (angular.isDefined($popup)) return;
       $popup = angular.element(template(tooltip, title));
       $timeout(function() {
        if(angular.isDefined($popup)){
         $body.append($popup);
         position($popup, $el, hint);
        }
       }, delay);
       break;
      case 'mouseout':
       if (angular.isUndefined($popup)) return;
       $timeout(function() {
        $popup.remove();
        $popup = undefined;
       }, timeout);
       break;
     }
    }

    $attrs.$observe('uiTooltip', function(value) {
     if (!value) return;
     tooltip = value;
    });
    $attrs.$observe('tooltipPosition', function(value) {
     if (!value) return;
     hint = value;
    });

    $el.on('mouseenter', render);
    $el.on('mouseleave', render);

    $scope.$on(
     "$destroy",
     function handleDestroyEvent() {
      $el.off('hover', render);
     }
    );
   }
  };
 }])
