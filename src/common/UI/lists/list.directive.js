;(function() {
  angular.module('odin.common').directive('pbsList', pbsList)

  function pbsList() {
    var template = '<table class="table is-fullwidth" ng-transclude></table>'

    return {
      restrict: 'E',
      template: template,
      replace: true,
      transclude: true
    }
  }
})()
