;(function() {
  var template =
    '<div>' +
    '  <div class="card pbs-spinner-card" ng-if="$ctrl.loading">' +
    '    <div class="card-content">' +
    '      <div class="spinner"></div>' +
    '    </div>' +
    '  </div>' +
    '  <div ng-transclude ng-if="!$ctrl.loading"></div>' +
    '</div>'

  angular.module('odin.common').component('pbsSpinner', {
    template: template,
    transclude: true,
    bindings: { loading: '<' }
  })
})()
