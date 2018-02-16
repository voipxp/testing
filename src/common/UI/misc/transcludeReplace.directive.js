/**
 * Created by Gogoout on 14-8-26.
 * From https://github.com/gogoout/angular-directives-utils
 */
angular.module('odin.common').directive('ngTranscludeReplace', [
  '$log',
  function($log) {
    return {
      terminal: true,
      restrict: 'EA',
      link: function($scope, $element, $attr, ctrl, transclude) {
        if (!transclude) {
          $log.error(
            'orphan',
            'Illegal use of lgTranscludeReplace directive in the template! ' +
              'No parent directive that requires a transclusion found. '
          )
          return
        }
        transclude(function(clone) {
          if (clone.length) {
            $element.replaceWith(clone)
          } else {
            $element.remove()
          }
        })
      }
    }
  }
])
