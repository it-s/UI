angular.module('com.likalo.ui')
 .directive('uiIconXlinkHref', function() {
  return {
   priority: 99,
   restrict: 'A',
   link: function(scope, element, attr) {
    var attrName = 'xlink:href';
    attr.$observe('uiIconXlinkHref', function(value) {
     if (!value) return;
     attr.$set(attrName, "#icon--" + value);
    });
   }
  };
 })
 .directive('uiIcon', ['$document', function($document) {
  return {
   replace: true,
   restrict: 'E',
   scope: {
    type: "@",
    hover: "@",
    active: "@",
    overlay: "@"
   },
   controller: function($scope) {
    $scope['layers'] = [];
    $scope['layers'].push({type: 'base', src: $scope['type'] || "unknown"});
    if($scope['hover']) $scope['layers'].push({type: 'hover', src: $scope['hover']});
    if($scope['active']) $scope['layers'].push({type: 'active', src: $scope['active']});
    if($scope['overlay']) $scope['layers'].push({type: 'overlay', src: $scope['overlay']});
   },
   template: '<svg class="UI-icon UI-icon--{{type}}"><use xmlns:xlink="http://www.w3.org/1999/xlink" ng-repeat="layer in layers" class="UI-layer--{{layer.type}}" ui-icon-xlink-href="{{layer.src}}" xlink:href=""></use></svg>'
  };
 }])
 .directive('uiMonogram', ['$document', 'uiPalette', function($document, uiPalette) {
  function getColor(i) {
    return uiPalette[Math.floor(i)%uiPalette.length];
  }
  //http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
  function shadeColor2(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  }
  return {
   replace: true,
   restrict: 'E',
   scope: {
    text: "@"
   },
   controller: function($scope) {
     $scope.text = $scope.text || "?";
     //Get just the firrst letter
     $scope.glyph = $scope.text.toLowerCase().substring(0, 2);
     $scope.accentColor = getColor($scope.text.charCodeAt(0)/$scope.text.length);
     $scope.backgroundColor = shadeColor2($scope.accentColor, 0.9);
   },
   template: '<svg class="UI-monogram UI-monogram--{{glyph}}" viewBox="0 0 24 24"><circle class="UI-monogram--base" cx="12" cy="12" r="10" style="fill:{{backgroundColor}};stroke:{{accentColor}}" /><text class="UI-monogram--glyph" x="12" y="16" font-family="sans" font-size="12" text-anchor="middle"  style="fill:{{accentColor}}">{{glyph}}</text></svg>'
  };
 }]);
