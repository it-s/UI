// angular.module('com.likalo.ui')
//  .directive('uiEditable', function($document) {
//   return {
//    restrict: 'A',
//    require: 'ngModel'
//    transclude: true,
//    scope: {
//     type: "@",
//     placeholder: "@",
//     disabled: "@"
//    },
//     link: function switchController($scope, $el, $attrs, ngModel) {
// 
//         ngModel.$render = function() {
//             if(angular.isDefined(ngModel.$modelValue))
//             $el.toggleClass('active', ngModel.$modelValue === true);
//         };
//         
//         $el.on('click', function(e) {
//             if ($attrs.disabled) return;
//             var isActive = $el.hasClass('active');
//             $scope.$apply(function() {
//                 ngModel.$setViewValue(!isActive);
//                 ngModel.$render();
//             });
//             e.stopPropagation();
//         });
//         
//         $el.addClass("UI-toggle");
//         if ($el.hasClass('active')) ngModel.$setViewValue(true);
//             
//      $scope.type = $scope['type'] || 'text';
//      $scope.placeholder = $scope['placeholder'] || '';
//      $scope.editing = false;
// 
//     },
//    template: '<span class="UI--editable-static" ng-hide="editing" ng-transclude></span><input ng-show="editing" class="UI--editable-input" type="{{type}}" placeholder="{{placeholder}}"><small class="UI--editable-toggle" ng-click="editing=!editing"></small>'
//   };
//  }); 
