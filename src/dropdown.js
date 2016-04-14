angular.module('com.likalo.ui')
 .directive('uiPicker', ['$window', '$document', function($window, $document) {
  return {
   restrict: 'EA',
   require: 'ngModel',
   replace: true,
   scope: {
    options: "=",
    placeholder: "@",
    type: "@"
   },
   template: '<div class="UI-picker" ng-class="{active: expanded, bottom: !top, top: top}"><a href="#" class="pure-menu-link UI-picker--label layout--flex-row" ng-click="toggle($event)"><img class="UI-picker--label-image layout--flex-cell" ng-src="{{selected.src}}" ng-if="selected.src"/><ui-icon class="UI-picker--label-icon layout--flex-cell" type="{{selected.icon}}" ng-if="selected.icon"></ui-icon><span class="UI-picker--label-title layout--flex-cell fill" ng-bind="selected?selected.title:placeholder" ng-if="selected.title || !selected&&placeholder"></span><ui-icon class="UI-picker--carret layout--flex-cell" type="down"></ui-icon></a><nav class="UI-picker--list"><ul class="pure-menu-list"><li class="pure-menu-item" ng-class="{active: item === selected}" ng-click="select(item)" ng-repeat="item in options"><span class="pure-menu-link"><img class="UI-picker--list-image" ng-src="{{item.src}}" ng-if="item.src"/><ui-icon class="UI-picker--list-icon layout--menu-icon" type="{{item.icon}}" ng-if="item.icon"></ui-icon><span class="UI-picker--list-label" ng-if="item.title">{{item.title}}</span></span></li></ul></nav></div>',
   link: function($scope, $el, $attrs, ngModel) {

    var el = elementUnwrap($el),
        label = $el.children()[0],
        list = $el.children()[1];

    ngModel.$formatters.push(function(value) {
     var selected;
     angular.forEach($scope.options, function(item) {
      if (item['id'] === value || angular.isUndefined(selected) && item['default']) selected = item;
     });
     //         if(angular.isUndefined(selected))selected=
     return selected;
    });

    ngModel.$render = function() {
     $scope.selected = ngModel.$viewValue;
    };

    ngModel.$parsers.push(function(value) {
     return value['id'];
    });

    $scope.toggle = function(e) {
      var left;
     if ($attrs.disabled) return;
     try {
      if (e.clientY > $window.innerHeight / 2) $scope.top = true;
      else $scope.top = false;
      //Must make sure we do not place the popup outside of the
      //main window view
      left = Math.floor((el.offsetWidth - list.offsetWidth) / 2);
      left = el.offsetLeft + left > 0? left : 0;
      left = el.offsetLeft + el.offsetWidth + left < $window.innerWidth? left : $window.innerWidth - el.offsetLeft + el.offsetWidth;
      list.setAttribute('style', 'margin-left:' + left + 'px')
      e.stopPropagation();
     } catch (e) {
      angular.noop();
     } //We just want to make sure we do not fail when event is not passed
     $scope.expanded = !$scope.expanded;
     return true;
    }

    $scope.toggleOutside = function(e) {
     var rect = list.getClientRects()[0];
     if (e.clientX > rect.left && e.clientX < rect.right && e.clientY > rect.top && e.clientY < rect.bottom) angular.noop();
     else $scope.$apply($scope.toggle);
    };

    $scope.select = function(item) {
     ngModel.$setViewValue(item);
     ngModel.$render();
     $scope.toggle();
    }

    $scope.$watch('expanded', function(v) {
     if (v === true)
      $document.on('click', $scope.toggleOutside);
     else
      $document.off('click', $scope.toggleOutside);
    });

    $scope.$on("$destroy",
     function handleDestroyEvent() {
      $document.off('click', $scope.toggleOutside);
     }
    );

    $el.addClass('UI-' + ($scope.type || 'dropdown'));
   }
  };
 }]);
