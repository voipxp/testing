import angular from 'angular'
import './index.css'

angular.module('odin.ui').directive('pbsSubtitle', pbsSubtitle)

function pbsSubtitle() {
  return {
    restrict: 'E',
    template: '<h4 class="subtitle" ng-transclude></subtitle>',
    transclude: true,
    replace: true
  }
}
