import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupNightForwarding', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupNightForwardingService', 'Module']
function controller(Alert, GroupNightForwardingService, Module) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.options = GroupNightForwardingService.options

  function loadModule() {
    return Module.show("Group Night Forwarding").then(function(data) {
      ctrl.module = data
    })
  }

  function onInit() {
    loadModule()
    ctrl.loading = true
    return load()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function load() {
    return GroupNightForwardingService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.settings = data
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editGroupNightForwardingModal', function(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    settings.serviceProviderId = ctrl.serviceProviderId
    settings.groupId = ctrl.groupId
    GroupNightForwardingService.update(settings)
      .then(load)
      .then(function() {
        Alert.notify.success('Settings Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
