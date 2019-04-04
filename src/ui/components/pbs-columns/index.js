/*
  <pbs-columns>
    <pbs-column narrow="true">Make this only as big as it needs</pbs-column>
    <pbs-column>Some More Stuff</pbs-column>
    <pbs-column>Fill space with this one</pbs-column>
  </pbs-columns>
*/
import angular from 'angular'

angular.module('odin.UI').directive('pbsColumns', pbsColumns)

const template = '<div class="columns" ng-transclude></div>'

function pbsColumns() {
  return {
    restrict: 'E',
    template: template,
    transclude: true,
    replace: true
  }
}
