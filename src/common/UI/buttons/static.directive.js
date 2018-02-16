;(function() {
  angular.module('odin.common').directive('pbsButtonStatic', pbsButtonStatic)

  function pbsButtonStatic() {
    var template =
      '<a class="button is-static pbs-button-static" ng-transclude></a>'
    return {
      restrict: 'E',
      template: template,
      transclude: true,
      replace: true
    }
  }
})()
