// This can be used to prevent a parent ng-click from firing
//
// <tr ng-click="$ctrl.doSomething()">
//   <td>HI</td>
//   <td no-parent-click><button>I have my own click</button></td>
// </tr>

import angular from 'angular'

angular.module('odin.UI').directive('noParentClick', Directive)

function Directive() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.on('click', function(event) {
        event.stopPropagation()
        return false
      })
    }
  }
}
