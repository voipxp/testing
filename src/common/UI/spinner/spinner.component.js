;(function() {
  var template =
    '<div>' +
    '  <div class="box" ng-if="$ctrl.loading">' +
    '    <div class="spinner"></div>' +
    '  </div>' +
    '  <div ng-transclude ng-if="!$ctrl.loading"></div>' +
    '</div>'

  angular.module('odin.common').component('pbsSpinner', {
    template: template,
    transclude: true,
    bindings: { loading: '<' }
  })
})()
