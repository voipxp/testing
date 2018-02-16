;(function() {
  angular.module('odin.common').directive('pbsInputSelect', Directive)

  function Directive() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        // wrap in a field
        var div = angular.element(document.createElement('div'))
        div.addClass('select is-fullwidth')
        if (attrs.hasOwnProperty('fullWidth')) {
          div.addClass('is-fullwidth')
        }
        element.wrap(div)
      }
    }
  }
})()
