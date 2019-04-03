import angular from 'angular'

angular.module('odin.UI').directive('autofocus', directive)

directive.$inject = ['$timeout']
function directive($timeout) {
  return {
    restrict: 'A',
    link: function($scope, $element) {
      $timeout(function() {
        $element[0].focus()
      })
    }
  }
}
