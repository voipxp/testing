/**
 * Created by Gogoout on 14-8-26.
 * From https://github.com/gogoout/angular-directives-utils
 */

import angular from 'angular'

angular.module('odin.ui').directive('ngTranscludeReplace', [
  '$log',
  function($log) {
    return {
      terminal: true,
      restrict: 'EA',
      link: function($scope, $element, attribute, ctrl, transclude) {
        if (!transclude) {
          $log.error(
            'orphan',
            'Illegal use of lgTranscludeReplace directive in the template! ' +
              'No parent directive that requires a transclusion found. '
          )
          return
        }
        transclude(function(clone) {
          if (clone.length > 0) {
            $element.replaceWith(clone)
          } else {
            $element.remove()
          }
        })
      }
    }
  }
])
