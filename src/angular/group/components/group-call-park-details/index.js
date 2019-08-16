import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallParkDetails', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupCallParkService']
function controller(Alert, GroupCallParkService) {
  var ctrl = this
  ctrl.$onInit = onInit

  ctrl.edit = edit
  ctrl.options = GroupCallParkService.options

  function onInit() {
    ctrl.loading = true
    loadSettings()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadSettings() {
    return GroupCallParkService.show(ctrl.serviceProviderId, ctrl.groupId).then(function(data) {
      ctrl.settings = data
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('groupCallParkDetailsEditModal', function(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    GroupCallParkService.update(settings)
      // .then(loadSettings)
      .then(function(data) {
        ctrl.settings = data
      })
      .then(function() {
        Alert.notify.success('Settings Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
