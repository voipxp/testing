import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupSpeedDial100', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupSpeedDial100Service']
function controller(Alert, GroupSpeedDial100Service) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.options = GroupSpeedDial100Service.options

  function onInit() {
    ctrl.loading = true
    return load()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function load() {
    return GroupSpeedDial100Service.index(ctrl.serviceProviderId, ctrl.groupId).then(function(
      data
    ) {
      ctrl.settings = data
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editGroupSpeedDial100Modal', function(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    settings.serviceProviderId = ctrl.serviceProviderId
    settings.groupId = ctrl.groupId
    GroupSpeedDial100Service.update(settings)
      .then(load)
      .then(function() {
        Alert.notify.success('Settings Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
