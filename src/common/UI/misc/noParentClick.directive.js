// This can be used to prevent a parent ng-click from firing
//
// <tr ng-click="$ctrl.doSomething()">
//   <td>HI</td>
//   <td no-parent-click><button>I have my own click</button></td>
// </tr>
;(function() {
  angular.module('odin.common').directive('noParentClick', Directive)

  function Directive() {
    return {
      restrict: 'A',
      link: function(scope, elem) {
        elem.on('click', function(event) {
          event.stopPropagation()
          return false
        })
      }
    }
  }
})()
