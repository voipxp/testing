;(function() {
  angular.module('odin.UI').component('pbsInputSelectDoc', {
    templateUrl: 'UI/pbsInputSelect/index.component.html',
    controller: function($timeout) {
      var ctrl = this
      ctrl.$onInit = function() {
        ctrl.loading = true
        $timeout(function() {
          ctrl.options = ['option 1', 'option 2']
          ctrl.loading = false
        }, 3000)
      }
    }
  })
})()
