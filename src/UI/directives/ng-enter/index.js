import angular from 'angular'

angular.module('odin.UI').directive('ngEnter', ngEnter)

function ngEnter() {
  return function(scope, element, attributes) {
    element.bind('keydown keypress', function(event) {
      if (event.which === 13) {
        scope.$apply(function() {
          scope.$eval(attributes.ngEnter)
        })
        event.preventDefault()
      }
    })
  }
}
