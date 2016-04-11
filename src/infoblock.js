angular.module('com.likalo.ui')
 .directive('uiInfoBlock', ['$document', function($document) {
  return {
   replace: true,
   restrict: 'E',
   transclude: true,
   scope: {
    type: "@"
   },
   controller: function($scope) {
     $scope.type = $scope['type'] || 'info';
   },
   template: '<aside class="UI-info-block UI-info-block--{{type}}"><svg class="UI-info-block--decorator"><rect class="UI-decorator--base" height="100%"/><use xmlns:xlink="http://www.w3.org/1999/xlink" class="UI-decorator--icon" ui-icon-xlink-href="{{type}}" xlink:href=""></use></svg><p class="UI-info-block--content" ng-transclude></p></aside>'
  };
 }]);
