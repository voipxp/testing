import angular from 'angular'

angular.module('odin.common').directive('ngEscape', ngEscape)

function ngEscape() {
  return function(scope, element, attributes) {
    element.bind('keydown keypress', function(event) {
      if (event.which === 27) {
        scope.$apply(function() {
          scope.$eval(attributes.ngEscape)
        })
        event.preventDefault()
      }
    })
  }
}
