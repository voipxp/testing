import angular from 'angular'

angular
  .module('odin.UI')
  .directive('pbsFormFieldHorizontal', pbsFormFieldHorizontal)

const template = `
<div class="columns is-2 is-variable">
  <div class="column is-two-fifths">
    <pbs-button-static class="is-fullwidth">{{ label }}</pbs-button-static>
  </div>
  <div class="column" ng-transclude></div>
</div>
`

function pbsFormFieldHorizontal() {
  return {
    template,
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: { label: '@' }
  }
}
