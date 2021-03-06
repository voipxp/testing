import angular from 'angular'
import ClipboardJS from 'clipboard'

angular.module('odin.ui').directive('pbsClipboard', pbsClipboard)

pbsClipboard.$inject = ['Alert']
function pbsClipboard(Alert) {
  return {
    restrict: 'A',
    scope: {
      clipboardText: '<'
    },
    link: function(scope, element) {
      element.addClass('hover')
      element.attr('title', 'Copy To Clipboard')

      var clipboard = new ClipboardJS(element[0], {
        text: function() {
          return scope.clipboardText || element.data('clipboard-text')
        }
      })

      // clipboard.on('success', function(e) {
      //   scope.$apply(function() {
      //     Alert.notify.info(e.text, 'Copied')
      //   })
      // })
      clipboard.on('error', function() {
        scope.$apply(function() {
          Alert.notify.warning('Press Ctrl-C to Copy', 'Copy')
        })
      })
      element.on('$destroy', function() {
        clipboard.destroy()
      })
    }
  }
}
