;(function() {
  angular.module('odin.common').directive('pbsSubtitle', pbsSubtitle)

  function pbsSubtitle() {
    return {
      restrict: 'E',
      template: '<h4 class="subtitle" ng-transclude></subtitle>',
      transclude: true,
      replace: true
    }
  }
})()
