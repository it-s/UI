angular.module('com.likalo.ui')
  .directive('uiGroup', function($document) {
  return {
  restrict: 'A',
  require: 'ngModel',
  link: function($scope, $el, $attrs, ngModel){
      
      ngModel.$render = function() {
	if(angular.isDefined(ngModel.$modelValue))
	  $el.toggleClass('active', angular.equals(ngModel.$modelValue, $attrs.uiGroup));
      };
    
    $el.on('click', function() {
	if ($attrs.disabled) return;
	var isActive = $el.hasClass('active');
	if (!isActive || angular.isDefined($attrs.uncheckable)) {
	  $scope.$apply(function() {
	    ngModel.$setViewValue($attrs.uiGroup);
	    ngModel.$render();
	  });
	}
      });
    
        if ($el.hasClass('active')) ngModel.$setViewValue($attrs.uiGroup);
    
  }
  };
});

