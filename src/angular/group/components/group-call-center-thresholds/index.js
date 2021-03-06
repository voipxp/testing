import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterThresholds', {
  template,
  controller,
  bindings: { serviceUserId: '=' }
})

controller.$inject = ['Alert', 'GroupCallCenterThresholdService', 'Module']
function controller(Alert, GroupCallCenterThresholdService, Module) {
  var ctrl = this
  ctrl.edit = edit
  ctrl.options = GroupCallCenterThresholdService.options
  ctrl.$onInit = activate
  ctrl.addEmail = addEmail
  ctrl.removeEmail = removeEmail
  ctrl.canUpdate = Module.update('Call Center')

  function activate() {
    ctrl.loading = true
    loadSettings()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadSettings() {
    return GroupCallCenterThresholdService.show(ctrl.serviceUserId).then(
      function(data) {
        ctrl.settings = data
        return data
      }
    )
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editGroupCallCenterThresholds', function onSave(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    GroupCallCenterThresholdService.update(ctrl.serviceUserId, settings)
      .then(loadSettings)
      .then(function() {
        Alert.notify.success('Call Center Thresholds Updated')
        if (_.isFunction(callback)) {
          callback()
        }
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function addEmail() {
    if (!ctrl.editSettings.notificationEmailAddresses) {
      ctrl.editSettings.notificationEmailAddresses = []
    }
    if (
      !_.includes(ctrl.editSettings.notificationEmailAddresses, ctrl.newEmail)
    ) {
      ctrl.editSettings.notificationEmailAddresses.push(ctrl.newEmail)
    }
    ctrl.newEmail = ''
  }

  function removeEmail(index) {
    ctrl.editSettings.notificationEmailAddresses.splice(index, 1)
  }
}
