;(function() {
  angular.module('odin.common').directive('pbsInputSwitch', Directive)

  function Directive(HashService) {
    return {
      restrict: 'A',
      scope: { label: '@', ngLabel: '<', pbsInputSwitch: '@', ngShow: '=' },
      link: function(scope, element) {
        var id = HashService.guid()
        // add id and class
        element.attr('id', id)
        element.addClass('switch')

        // wrap in a control in a field
        var div = angular.element(document.createElement('div'))
        div.addClass('field')

        var p = angular.element(document.createElement('p'))
        p.addClass('control')
        if (scope.pbsInputSwitch === 'centered') {
          p.addClass('has-text-centered')
        }

        element.wrap(div)
        element.wrap(p)

        // add label
        var label = angular.element(document.createElement('label'))
        label.attr('for', id)
        label.html(scope.label)
        element.after(label)

        scope.$watch('ngLabel', function(newVal) {
          if (newVal) label.html(newVal)
        })
      }
    }
  }
})()
