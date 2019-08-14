import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userRemoteOfficeQuickSet', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
})

controller.$inject = ['Alert', 'UserRemoteOfficeService', 'Route']
function controller(Alert, UserRemoteOfficeService, Route) {
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
    return UserRemoteOfficeService.show(ctrl.userId).then(function(data) {
      ctrl.settings = data
    })
  }

  function toggle() {
    if (!ctrl.settings.remoteOfficePhoneNumber) {
      Alert.notify.warning('Please Configure a Phone Number')
      return Route.open('users', ctrl.serviceProviderId, ctrl.groupId, ctrl.userId, 'remoteOffice')
    }
    ctrl.loading = true
    UserRemoteOfficeService.update(ctrl.userId, ctrl.settings)
      .then(loadSettings)
      .then(function() {
        Alert.notify.success('Remote Office Updated')
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
