import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupVoiceMessagingPortal', {
  template,
  controller,
  bindings: { serviceProviderId: '=', groupId: '=', module: '<' }
})

controller.$inject = ['Alert', 'GroupVoicePortalService']
function controller(Alert, GroupVoicePortalService) {
  var ctrl = this
  ctrl.$onInit = activate
  ctrl.edit = edit
  ctrl.options = GroupVoicePortalService.options
  ctrl.updateProfile = updateProfile

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
    return GroupVoicePortalService.show(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.settings = data
      return data
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editGroupVoiceMessagingPortal', function onSave(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    GroupVoicePortalService.update(
      ctrl.serviceProviderId,
      ctrl.groupId,
      settings
    )
      .then(loadSettings)
      .then(function() {
        Alert.notify.success('Voice Portal Updated')
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

  function updateProfile(event) {
    ctrl.editSettings = angular.copy(ctrl.settings)
    ctrl.editSettings.serviceInstanceProfile = event.profile
    update(ctrl.editSettings, event.callback)
  }
}
