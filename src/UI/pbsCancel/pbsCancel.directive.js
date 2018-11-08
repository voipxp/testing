;(function() {
  angular.module('odin.UI').directive('pbsCancel', Directive)

  function Directive() {
    return {
      restrict: 'E',
      template: `
<span style="position: relative; width: 0; height: 0;">
  <a class="delete"
   style="position: absolute; left: -10px; top: -10px; z-index: 30; margin: 0; padding: 0; background-color: #7a7a7a;"></a>
</span>
`
    }
  }
})()
