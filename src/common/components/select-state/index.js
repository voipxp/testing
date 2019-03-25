import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('selectState', {
  template,
  controller,
  bindings: { ngRequired: '<', ngModel: '=' }
})

controller.$inject = ['Alert', 'SystemStateService']
function controller(Alert, SystemStateService) {
  var ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    ctrl.loading = true
    loadStates()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadStates() {
    return SystemStateService.index().then(function(data) {
      ctrl.states = data
      return data
    })
  }
}
