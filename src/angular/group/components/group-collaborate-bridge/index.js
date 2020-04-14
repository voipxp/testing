import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCollaborateBridge', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' , serviceUserId: '<' }
})

controller.$inject = ['Alert', 'GroupCollaborateService', 'Route', '$location']
function controller(Alert, GroupCollaborateService, Route, $location) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.back = back
  ctrl.update = update
  ctrl.onUpdateProfile = onUpdateProfile
  ctrl.options = GroupCollaborateService.options
  ctrl.edit = edit
  ctrl.back = back

  function onInit() {
    ctrl.serviceUserId = $location.search().serviceUserId || ctrl.serviceUserId
    ctrl.loading = true
    loadBridge()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadBridge() {
    return GroupCollaborateService.show(ctrl.serviceUserId).then(data => {
      ctrl.bridge = data
    })
  }

  function edit() {
    var onDelete = ctrl.bridge.isDefault
      ? null
      : close => {
          Alert.confirm
            .open('Are you sure you want to delete this Bridge?')
            .then(() => destroy(ctrl.bridge, close))
        }
    ctrl.editBridge = angular.copy(ctrl.bridge)
    Alert.modal.open(
      'editGroupCollaborate',
      close => update(ctrl.editBridge, close),
      onDelete
    )
  }

  function onUpdateProfile(event) {
    var bridge = angular.copy(ctrl.bridge)
    bridge.serviceInstanceProfile = event.profile
    update(bridge, event.callback)
  }

  function update(bridge, callback) {
    if (bridge.isDefault) delete bridge.users
    Alert.spinner.open()
    return GroupCollaborateService.update(ctrl.serviceUserId, bridge)
      .then(loadBridge)
      .then(function() {
        Alert.notify.success('Collaborate Bridge Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function destroy(bridge, callback) {
    Alert.spinner.open()
    GroupCollaborateService.destroy(bridge.serviceUserId)
      .then(function() {
        Alert.notify.success('Collaborate Bridge Removed')
        callback()
        back()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function back() {
    Route.open('groups', ctrl.serviceProviderId, ctrl.groupId,'groupService')
  }
}
