import angular from 'angular'

angular.module('odin.ui').directive('pbsButtonStatic', pbsButtonStatic)

const template = `
<a class="button is-static pbs-button-static" ng-transclude></a>
`
function pbsButtonStatic() {
  return {
    template,
    restrict: 'E',
    transclude: true,
    replace: true
  }
}
