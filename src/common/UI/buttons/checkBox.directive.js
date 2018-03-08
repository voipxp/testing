;(function() {
  angular.module('odin.common').directive('pbsCheckBox', pbsCheckBox)

  function pbsCheckBox() {
    var template =
      '<span class="icon"><i class="fas" ng-class="class()"></i></span>'

    return {
      restrict: 'E',
      template: template,
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
})()
