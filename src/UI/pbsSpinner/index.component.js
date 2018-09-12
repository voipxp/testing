;(function() {
  angular.module('odin.UI').component('pbsSpinnerDoc', {
    templateUrl: 'UI/pbsSpinner/index.component.html',
    controller: function($interval) {
      var ctrl = this
      ctrl.$onInit = function() {
        ctrl.loading = true
        $interval(function() {
          ctrl.loading = !ctrl.loading
        }, 3000)
      }
    }
  })
})()
