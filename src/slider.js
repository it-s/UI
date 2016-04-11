angular.module('com.likalo.ui')
  .directive('uiSlider', ['$window', function uiSlider($window) {
  return {
    restrict: 'EA',
    replace: true,
    require: '?ngModel',
    scope: {
      min: "@",
      max: "@",
      step: "@"
    },
    template: '<svg class="UI-slider"><rect class="UI-slider--base" width="100%"/><rect class="UI-slider--fill" ui-attrs="width:{{knob}}%" /><circle class="UI-slider--knob" ui-attrs="cx:{{knob}}%" cy="50%" r="0.5em"/></svg>',
    link: function($scope, $el, $attrs, ngModel) {
        
        ngModel = ngModel || new ngModelNoop();
        
        var base = $el.children()[0],
            isDown = false,
            sliderLeft, sliderRun, modelRun;
        
        ngModel.$formatters.push(function(value){
            return (value || 0) / modelRun;
        });
        
        ngModel.$render = function() {            
            $scope.value = ngModel.$modelValue;
            $scope.knob = Math.floor(ngModel.$viewValue * 100);
        }
        
        ngModel.$parsers.push(function(value){
            return value * modelRun;
        });
        
        function drag(e) {
            var offset = Math.min(Math.max((e.pageX - sliderLeft) / sliderRun, 0), 1);
            ngModel.$setViewValue(offset);
            $scope.$apply(ngModel.$render);
            
            e.preventDefault();
            e.stopPropagation();
        }
        
        $scope.$watchGroup(['min','max'], function(){
            modelRun = $scope.max - $scope.min;
        });
        
        $scope.$watchGroup([function onLeftChanged(){var rect = base.getBoundingClientRect(); return rect.left; },
                           function onWidthChanged(){var rect = base.getBoundingClientRect(); return rect.width; }],
                           function(){
                                var rect = base.getBoundingClientRect();
                                sliderLeft =rect.left;
                                sliderRun = rect.width;
                                ngModel.$render();
                            }, true);
            
        $scope.knob = $scope.value = 0;
        //We have to duplicate model modelRun calculation
        //othervise we can't properly $format the model value
        modelRun = $scope.max - $scope.min;
        
        function clearListeners(){
            isDown = false;
            $window.removeEventListener("mouseup", clearListeners, false);
            $window.removeEventListener("mousemove", drag, false);
        }

        $el.on("mousedown", function(e) {
            isDown = true;
            $window.addEventListener("mousemove", drag, false);
            $window.addEventListener("mouseup", clearListeners ,false);
            drag(e);
        });
        
        $scope.$on("$destroy", clearListeners);

    }
  }
}]);
