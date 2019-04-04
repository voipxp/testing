import angular from 'angular'

angular.module('odin.UI').directive('pbsCheckBox', pbsCheckBox)

const template = `
<span class="icon"><i class="fas" ng-class="class()"></i></span>
`
function pbsCheckBox() {
  return {
    template,
    restrict: 'E',
    replace: true,
    scope: { checked: '<', warning: '<' },
    link: function(scope) {
      scope.class = function() {
        return {
          'fa-check': scope.checked,
          'has-text-success': scope.checked && !scope.warning,
          'fa-times': !scope.checked,
          'has-text-danger': scope.checked && scope.warning
        }
      }
    }
  }
}
