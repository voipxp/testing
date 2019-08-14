import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userCallForwardingAlwaysQuickSet', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<', userId: '<' },
  require: { parent: '^^userQuickSet' }
})

controller.$inject = ['Alert', 'UserCallForwardingAlwaysService']
function controller(Alert, UserCallForwardingAlwaysService) {
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
    return UserCallForwardingAlwaysService.show(ctrl.userId).then(function(data) {
      ctrl.settings = data
    })
  }

  function toggle() {
    if (!ctrl.settings.forwardToPhoneNumber) {
      Alert.notify.warning('Please Configure a Phone Number')
      ctrl.parent.editService = 'User Call Forwarding Always'
      ctrl.settings.isActive = !ctrl.settings.isActive
      return
    }
    ctrl.loading = true
    UserCallForwardingAlwaysService.update(ctrl.userId, ctrl.settings)
      // .then(loadSettings)
      .then(function(data) {
        ctrl.settings = data
      })
      .then(function() {
        Alert.notify.success('Call Forwarding Always Updated')
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
