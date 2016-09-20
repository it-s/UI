angular.module('com.likalo.ui.helpers')
 .directive('scrollSpy', ['$window', '$timeout', function($window, $timeout) {
  var window = $window,
   parseAttr = function(val) {
    var arr, item;
    arr = val.split(',');
    if (angular.isArray(arr))
     angular.forEach(arr, function(v, i) {
      item = v.split(':');
      item[0] = String(item[0]);
      item[1] = Number(item[1]);
      arr[i] = item;
     });
    else return undefined;
    return arr;
   },
   compare = function(a, b) {
    if (a[1] < b[1]) {
     return -1;
    }
    if (a[1] > b[1]) {
     return 1;
    }
    return 0;
   },
   interpolate = function(v, i, arr) {
    if (i + 1 < arr.length) v[2] = (arr[i + 1])[1];
    else v[2] = 9999;
   };
  return {
   restrict: 'A',
   link: function($scope, $el, $attr) {
    var boundries = [],
     current;

    //Keep track of attribute changes
    $attr.$observe('scrollSpy', function(value) {
     if (!value) return;
     boundries = angular.forEach((parseAttr(value)).sort(compare), interpolate);
     //Update the initial value
     update();
    });

    //Update widget state on window scroll
    function update() {
     var name, min, max;
     angular.forEach(boundries, function(boundry) {
      name = boundry[0];
      min = boundry[1];
      max = boundry[2];
      if (window.scrollY >= min && window.scrollY < max) $el.addClass(name);
      else $el.removeClass(name);
     });
    }

    //Scroll Event listeners
    window.addEventListener('scroll', update);
    $scope.$on(
     "$destroy",
     function handleDestroyEvent() {
      window.removeEventListener('scroll', update);
     }
    );
   }
  };
 }]);
