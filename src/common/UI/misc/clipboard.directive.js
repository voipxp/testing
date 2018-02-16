;(function() {
  angular.module('odin.common').directive('pbsClipboard', pbsClipboard)

  function pbsClipboard(Alert) {
    return {
      restrict: 'A',
      scope: {
        clipboardText: '<'
      },
      link: function(scope, element) {
        element.addClass('hover')
        element.attr('title', 'Copy To Clipboard')

        var clipboard = new window.Clipboard(element[0], {
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
          // console.log('destroy')
          clipboard.destroy()
        })
      }
    }
  }
})()
