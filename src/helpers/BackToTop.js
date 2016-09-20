angular.module('com.likalo.ui.helpers')
.directive('toTop', ['$window', '$document', '$timeout' ,function($window, $document, $timeout){
  var window = $window,
      document = $document[0],
      frequency = 12,
      speed = 300,
      hopCount = (speed - (speed % frequency)) / frequency;;
  return {
   restrict: 'E',
   scope: {
     showAt: "@",
   },
   replace: true,
   template: '<a class="" ng-show="show"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle class="base" cx="12" cy="12" r="10"/><path class="arrow" d="M7 14l5-5 5 5z"/></svg></a>',
   link: function($scope, $el, $attr) {
     $scope.$el = $el;
     //Keep track of attribute changes
     $attr.$observe('showAt', function(value) {
      if (!value) return;
       $scope.showAt = Number(value || 60);
     });
     $el.on('click', $scope.toTop);
   },
   controller: ['$scope', function($scope){
    //Apply initial values
    $scope.showAt = Number($scope['showAt'] || 60);

    //Update widget state on window scroll
    function update() {
      $timeout(function(){
        $scope.show = window.scrollY > $scope.showAt;
      });
    }

    //Send window position to top
    $scope.toTop = function(e) {
      var currentOffset = window.pageYOffset !== undefined ? window.pageYOffset : 0,
        targetOffset = currentOffset / hopCount;
      for (var i = 1; i <= hopCount; i++) {
        (function() {
          var position = targetOffset * i;
          $timeout(function() {
            window.scrollTo(0, currentOffset - position);
          }, frequency * i);
        })();
      }
      return false;
      // window.scrollTo(0, 0);
    }

    //Scroll Event listeners
    window.addEventListener('scroll', update);
    $scope.$on(
        "$destroy",
        function handleDestroyEvent() {
          $scope.$el.off('click', $scope.toTop);
          window.removeEventListener('scroll', update);
        }
    );

    //Update the initial value
    update();
   }]
 };
}]);
