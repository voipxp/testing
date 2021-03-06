import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userDoNotDisturbQuickSet', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = ['Alert', 'UserDoNotDisturbService']
function controller(Alert, UserDoNotDisturbService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.toggle = toggle

  function onInit() {
    ctrl.loading = true
    loadSettings()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadSettings() {
    return UserDoNotDisturbService.show(ctrl.userId).then(function(data) {
      ctrl.settings = data
    })
  }

  function toggle() {
    ctrl.loading = true
    UserDoNotDisturbService.update(ctrl.userId, ctrl.settings)
      .then(loadSettings)
      .then(function() {
        Alert.notify.success('Do Not Disturb Updated')
      })
      .catch(function(error) {
        ctrl.settings.isActive = !ctrl.settings.isActive
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }
}
