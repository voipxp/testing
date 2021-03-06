import angular from 'angular'

angular.module('odin.ui').directive('pbsColumn', pbsColumn)

const template = '<div class="column" ng-transclude></span>'

function pbsColumn() {
  return {
    restrict: 'E',
    template: template,
    transclude: true,
    replace: true
  }
}
