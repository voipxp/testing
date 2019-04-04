import angular from 'angular'

angular.module('odin.ui').directive('pbsListSection', pbsListSection)

const template = `
<tr>
  <th colspan="2" style="padding-left: 0">
    <h4 class="subtitle has-text-weight-semibold" ng-transclude></h4>
  </th>
</tr>
`
function pbsListSection() {
  return {
    restrict: 'E',
    template: template,
    replace: true,
    transclude: true,
    scope: { label: '@' }
  }
}
