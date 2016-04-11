function uiScrollbar($window, $document, $timeout) {
  var document = $document[0];
  return {
    restrict: 'E',
    // require: '^^uiScrollable',
    replace: true,
    template: '<svg class="UI-scrollbar"><rect class="UI-scrollbar--base" width="100%" height="100%" /><rect class="UI-scrollbar--knob" width="100%" rx="4" ry="4" /></svg>',
    link: function($scope, $el, $attrs, uiScrollable) {
      var el = $el[0],
        parent = el.parentElement,
        container =  el.previousSibling,
        content = container.children[0],
        base = el.children[0],
        knob = el.children[1],
        isDown = false,
        styleBase = "position:absolute;top:0;right:0;height:100%",
        contentHeight, scrollbarTop, scrollbarBottom,
        scrollbarRun, scrollbarDY,
        scrollbarHeight, knobHeight, knobTop;

      function render() {
        scrollbarTop = parent.offsetTop;
        scrollbarHeight = container.clientHeight;
        scrollbarBottom = scrollbarTop + scrollbarHeight;
        contentHeight = Math.max(content.clientHeight - scrollbarHeight, 0);
        knobHeight = Math.max(Math.floor(scrollbarHeight / content.clientHeight * scrollbarHeight), 10);
        scrollbarRun = scrollbarHeight - knobHeight;
        // scrollbarTop += knobHeight/2;
        // contentHeight -= knobHeight;
        knob.style = "height:" + knobHeight + "px";
      }

      function move() {
        var offsetTop = Math.min(Math.max((container.scrollTop / contentHeight), 0), 1);
        knobTop = Math.min(Math.max(Math.floor((container.scrollTop / contentHeight) * scrollbarRun),0),scrollbarRun);
        knob.setAttribute('transform', "translate(0, " + knobTop + ")");
      }

      function drag(e) {
        // if(e.pageY < scrollbarTop ||e.pageY > scrollbarBottom) return;
        var offestTop = Math.min(Math.max((e.pageY - scrollbarTop) / scrollbarRun, 0),1);
        //console.log (offestTop * 100);
        container.scrollTop = Math.floor(contentHeight * offestTop);
        e.preventDefault();
        e.stopPropagation();
      }

      function clearListeners(){
        isDown = false;
        document.removeEventListener("mouseup", clearListeners, false);
        document.removeEventListener("mousemove", drag, false);
      }

      container.addEventListener("resize", render);
      content.addEventListener("resize", render);
      content.addEventListener("DOMContentLoaded", render);
      container.addEventListener('scroll', function onElementScroll(e) {
        console.log("Content scroll");
        move();
      });
      el.addEventListener("mousedown", function(e) {
        isDown = true;
        scrollbarDY = e.offsetY;
        document.addEventListener("mousemove", drag, false);
        document.addEventListener("mouseup", clearListeners ,false);
        drag(e);
      },true);

      el.style = styleBase;
      $timeout(function(){
        render();
      },200);

    }
  }
}

function uiScrollable() {
  return {
    restrict: 'A',
    transclude: true,
    replace: true,
    template: '<div class="UI-scrollable"><div class="UI-scrollable--container"><div class="UI-scrollable--content" ng-transclude=""></div></div><ui-scrollbar></ui-scrollbar></div>',
    link: function($scope, $el, $attrs, uiScrollable) {
      var el = $el[0], container = el.children[0];
      el.style = $attrs.style + ";position:relative;overflow:hidden;";
      container.style = "width:100%;height:100%;overflow:hidden;overflow-y:scroll;padding-right: 17px;box-sizing: content-box;";
    }
  }
}

angular.module('com.likalo.ui')
  .directive('uiScrollbar', ['$window', '$document', '$timeout', uiScrollbar])
  .directive('uiScrollable', uiScrollable);
