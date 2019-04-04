import angular from 'angular'

angular.module('odin.UI').directive('pbsFormField', pbsFormField)

const template = `
<div class="field">
  <label class="label">{{ label }}</label>
  <div class="control">
    <ng-transclude-replace></ng-transclude-replace>
  </div>
</div>
`

function pbsFormField() {
  return {
    template,
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: { label: '@' }
  }
}
