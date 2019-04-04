import angular from 'angular'

angular.module('odin.ui').directive('pbsCancel', Directive)

const template = `
<span style="position: relative; width: 0; height: 0;">
  <a
    class="delete"
    style="position: absolute; left: -10px; top: -10px; z-index: 30; margin: 0; padding: 0; background-color: #7a7a7a;"
  ></a>
</span>
`

function Directive() {
  return { restrict: 'E', template }
}
