import angular from 'angular'
import './index.css'

angular.module('odin.ui').directive('pbsListItem', pbsListItem)

const template = `
<tr>
  <td style="width: 60%">
    <span ng-class="{'is-child': nested}">{{ label }}</span>
  </td>
  <td ng-transclude></td>
</tr>
`

function pbsListItem() {
  return {
    restrict: 'E',
    template: template,
    replace: true,
    transclude: true,
    scope: { label: '@', nested: '<' }
  }
}
