;(function() {
  angular.module('odin.common').directive('frameSize', FrameSize)

  function FrameSize($window, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        setStyles(element, attrs.frameSize)
        element.on('load', function() {
          updateSize(element, attrs.frameSize)
        })
        element.on('orientationchange', function() {
          updateSize(element, attrs.frameSize)
        })
      }
    }

    function setStyles(element) {
      element.css({
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'scroll',
        border: 'none',
        padding: 0,
        margin: 0
      })
    }

    function updateSize(element, frameType) {
      var page = element[0].contentDocument
      var height =
        Math.max(page.body.offsetHeight + 100, $window.innerHeight) + 'px'
      var width = Math.max(page.body.offsetWidth, $window.innerWidth) + 'px'
      var parent = element.parent()
      $timeout(function() {
        if (frameType === 'modal') {
          element.css({ height: height, width: width })
          parent.css({
            height: height,
            overflow: 'auto',
            '-webkit-overflow-scrolling': 'touch'
          })
        } else if (frameType === 'embed') {
          element.css({ height: height })
          parent.css({ height: height })
        } else {
          element.css({ height: '100%' })
        }
      }, 50)
    }
  }
})()
