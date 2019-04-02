import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userBroadworksAnywhereQuickSet', {
  template,
  controller,
  bindings: { userId: '<', serviceProviderId: '<', groupId: '<' },
  require: { parent: '^^userQuickSet' }
})

controller.$inject = [
  'Alert',
  'UserBroadWorksAnywhereService',
  'PhoneNumberBroadWorksAnywhereService'
]
function controller(
  Alert,
  UserBroadWorksAnywhereService,
  PhoneNumberBroadWorksAnywhereService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.toggle = toggle
  ctrl.loadingNumber = {}
  ctrl.edit = edit

  function onInit() {
    ctrl.loading = true
    loadSettings()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadSettings() {
    return UserBroadWorksAnywhereService.show(ctrl.userId).then(function(data) {
      ctrl.settings = data
    })
  }

  function edit() {
    ctrl.parent.editService = 'userBroadWorksAnywhere'
  }

  function toggle(number) {
    ctrl.loadingNumber[number.phoneNumber] = true
    PhoneNumberBroadWorksAnywhereService.update(
      ctrl.userId,
      number.phoneNumber,
      number
    )
      .then(loadSettings)
      .then(function() {
        Alert.notify.success(number.phoneNumber + ' Updated')
      })
      .catch(function(error) {
        number.isActive = !number.isActive
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loadingNumber[number.phoneNumber] = false
      })
  }
}
