import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterStatisticsReporting', {
  template,
  controller,
  bindings: { serviceUserId: '=' }
})

controller.$inject = [
  'Alert',
  'GroupCallCenterStatisticsReportingService',
  'Module'
]
function controller(Alert, GroupCallCenterStatisticsReportingService, Module) {
  var ctrl = this
  ctrl.edit = edit
  ctrl.options = GroupCallCenterStatisticsReportingService.options
  ctrl.$onInit = activate
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
    return GroupCallCenterStatisticsReportingService.show(
      ctrl.serviceUserId
    ).then(function(data) {
      ctrl.settings = data
      return data
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editGroupCallCenterStatisticsReporting', function onSave(
      close
    ) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    GroupCallCenterStatisticsReportingService.update(
      ctrl.serviceUserId,
      settings
    )
      .then(loadSettings)
      .then(function() {
        Alert.notify.success('Statistics Reporting Updated')
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
}
