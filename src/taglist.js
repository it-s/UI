angular.module('com.likalo.ui')
  .directive('uiTaglist', ['$document',
    function ($document) {
      return {
        replace: true,
        restrict: 'EA',
        require: 'ngModel',
        transclude: true,
        scope: {
          // list: "@",
          ontagclick: "&",
          placeholder: "@",
          // disabled: "@",
          interactive: "=",
          max: "@"
        },
        // template: '<ul class="UI-taglist" ng-class="{\'UI-taglist--interactive\':interactive}"><li ng-if="canAdd()" class="UI-taglist--adder"><span ng-click="toggleAdd()" ng-hide="isAdding">+</span><input class="UI-taglist--input" type="text" ng-keyup="input($event)" ng-show="isAdding" /></li><li class="UI-taglist--placeholder" ng-if="placeholder" ng-hide="tags.length">{{placeholder}}</li><li class="pure-tag" ng-repeat="tag in tags track by $index"><span ng-click="action($index)">{{tag | lowercase}}</span><span class="UI-taglist--remove" ng-click="remove($index)" ng-if="interactive">×</span></li></ul>',
        template: '<ul class="UI-taglist" ng-class="{\'UI-taglist--interactive\':isInteractive}"><li ng-if="canAdd()" class="UI-taglist--adder"><input class="UI-taglist--input" type="text" ng-keyup="input($event)" placeholder="+" /></li><li class="UI-taglist--placeholder" ng-if="placeholder" ng-hide="tags.length">{{placeholder}}</li><li class="pure-tag" ng-repeat="tag in tags track by $index"><span class="UI-taglist--tag" ng-click="ontagclick({tag: tag, index: $index})">{{tag | lowercase}}</span><span class="UI-taglist--remove" ng-click="remove($index)" ng-if="interactive">×</span></li></ul>',
        link: function taglistController($scope, $el, $attrs, ngModel) {
          $scope.tags = [];
          $scope.isAdding = false;

          $scope.max = $scope.max || 999;

          $scope.isInteractive = angular.isDefined($attrs.ontagclick);

          ngModel.$formatters.push(function (value) {
          	$scope.tags = value || [];
            return $scope.tags;
          });

          $scope.toggleAdd = function() {
          	$scope.isAdding = !$scope.isAdding;
          }

          $scope.canAdd = function () {
          	return $scope.interactive === true &&
          			$scope.tags.length < $scope.max;
          };

          $scope.input = function (e) {
          	var tag = e.currentTarget.value;
          	if (e.keyCode === 27){
          		$scope.toggleAdd();
          		e.currentTarget.blur();
          		return false;
          	}
            if (e.keyCode !== 13 || tag === "") return true;
            $scope.tags.unshift(tag);
            e.currentTarget.value = "";
            ngModel.$setViewValue($scope.tags);
	        $scope.toggleAdd();
            return false;
          };
          $scope.remove = function ($index) {
            $scope.tags.splice($index, 1);
            ngModel.$setViewValue($scope.tags);
          };

        }
      };
    }
  ]);