;(function() {
  angular.module('odin.common').directive('pbsButtonBack', pbsButtonBack)

  function pbsButtonBack($window) {
    var template =
      '<a class="button is-outlined is-link" ng-click="go()" style="display: inline-block; vertical-align: middle" ng-show="returnTo">' +
      '  <span class="icon"><i class="fa fa-chevron-left"></i></span>' +
      '</a>'
    return {
      restrict: 'E',
      template: template,
      replace: true,
      scope: { returnTo: '<' },
      link: function(scope) {
        scope.go = function() {
          $window.location.href = scope.returnTo
        }
      }
    }
  }
})()
