/*
  <pbs-columns>
    <pbs-column narrow="true">Make this only as big as it needs</pbs-column>
    <pbs-column>Some More Stuff</pbs-column>
    <pbs-column>Fill space with this one</pbs-column>
  </pbs-columns>
*/

;(function() {
  angular.module('odin.common').directive('pbsColumns', pbsColumns)
  function pbsColumns() {
    var template = '<div class="columns" ng-transclude></div>'
    return {
      restrict: 'E',
      template: template,
      transclude: true,
      replace: true
    }
  }

  angular.module('odin.common').directive('pbsColumn', pbsColumn)
  function pbsColumn() {
    var template = '<div class="column" ng-transclude></span>'
    return {
      restrict: 'E',
      template: template,
      transclude: true,
      replace: true
    }
  }
})()
