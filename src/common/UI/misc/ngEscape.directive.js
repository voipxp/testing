;(function() {
  angular.module('odin.common').directive('ngEscape', ngEscape)

  function ngEscape() {
    return function(scope, element, attrs) {
      element.bind('keydown keypress', function(event) {
        if (event.which === 27) {
          scope.$apply(function() {
            scope.$eval(attrs.ngEscape)
          })
          event.preventDefault()
        }
      })
    }
  }
})()
