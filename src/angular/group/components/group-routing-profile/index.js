import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupRoutingProfile', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  '$q',
  'Alert',
  'SystemRoutingProfileService',
  'GroupRoutingProfileService'
]
function controller(
  $q,
  Alert,
  SystemRoutingProfileService,
  GroupRoutingProfileService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.options = {}

  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadSystemRoutingProfiles(), loadGroupRoutingProfile()])
      .then(function() {})
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadSystemRoutingProfiles() {
    return SystemRoutingProfileService.index().then(function(data) {
      ctrl.options.routingProfiles = data
    })
  }

  function loadGroupRoutingProfile() {
    return GroupRoutingProfileService.show(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.settings = data
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editGroupRoutingProfileModal', function(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    settings.serviceProviderId = ctrl.serviceProviderId
    settings.groupId = ctrl.groupId
    GroupRoutingProfileService.update(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.editSettings.routingProfile
    )
      .then(loadGroupRoutingProfile)
      .then(function() {
        Alert.notify.success('Settings Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
