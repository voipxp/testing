import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userSharedCallAppearanceAdmin', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
})

controller.$inject = [
  'Alert',
  'UserSharedCallAppearanceService',
  'Module',
  '$q'
]
function controller(Alert, UserSharedCallAppearanceService, Module, $q) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  // used in children to reload sca
  ctrl.reload = loadSharedCallAppearance

  ctrl.options = {
    bridgeWarningTone: ['None', 'Barge-In', 'Barge-In and Repeat']
  }

  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadSharedCallAppearance(), loadModule()])
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadModule() {
    return Module.show('Shared Call Appearance').then(function(data) {
      ctrl.module = data
    })
  }

  function loadSharedCallAppearance() {
    return UserSharedCallAppearanceService.show(ctrl.userId).then(function(
      data
    ) {
      ctrl.sharedCallAppearance = data
    })
  }

  function edit() {
    ctrl.editSharedCallAppearance = angular.copy(ctrl.sharedCallAppearance)
    Alert.modal.open('userSharedCallAppearanceEditModal', function(close) {
      update(ctrl.editSharedCallAppearance, close)
    })
  }

  function update(service, callback) {
    Alert.spinner.open()

    UserSharedCallAppearanceService.update(ctrl.userId, service)
      .then(loadSharedCallAppearance)
      .then(function() {
        Alert.notify.success('Shared Call Appearance Updated')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}
