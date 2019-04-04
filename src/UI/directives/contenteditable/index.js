import angular from 'angular'
import './index.css'

angular.module('odin.UI').directive('contenteditable', ContentEditable)

ContentEditable.$inject = ['$sce', '$timeout']
function ContentEditable($sce, $timeout) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, element, attributes, ngModel) {
      if (!ngModel) return

      element.on('focus', function() {
        $timeout(function() {
          document.execCommand('selectAll', false, null)
        }, 5)
      })
      // Specify how UI should be updated
      ngModel.$render = function() {
        element.html($sce.getTrustedHtml(ngModel.$viewValue || ''))
        read()
      }

      // Listen for change events to enable binding
      element.on('blur keyup change', function() {
        scope.$evalAsync(read)
      })

      element.on('keydown keypress', function(event) {
        if (event.which === 13) {
          element[0].blur()
          event.preventDefault()
        }
      })

      // initialize
      // Write data to the model
      function read() {
        let html = element.html()
        // When we clear the content editable the browser leaves a <br> behind
        if (html === '<br>') {
          html = ''
        }
        ngModel.$setViewValue(html)
      }
    }
  }
}
