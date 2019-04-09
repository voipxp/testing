import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupMeetMeBridgeDetails', {
  template,
  controller,
  require: { parent: '^meetMeBridge' }
})

controller.$inject = ['Alert', 'GroupMeetMeConferencingPortService']
function controller(Alert, GroupMeetMeConferencingPortService) {
  var ctrl = this
  ctrl.ports = {}
  ctrl.edit = edit

  function activate() {
    return loadPorts().catch(function(error) {
      Alert.notify.danger(error)
    })
  }

  function loadPorts() {
    return GroupMeetMeConferencingPortService.index(
      ctrl.parent.serviceProviderId,
      ctrl.parent.groupId
    ).then(function(data) {
      ctrl.ports = data
      return data
    })
  }

  function edit() {
    Alert.spinner.open()
    var onDelete
    if (ctrl.parent.module.permissions.delete) {
      onDelete = ctrl.parent.remove
    }
    activate()
      .then(function() {
        ctrl.bridge = angular.copy(ctrl.parent.bridge)
        Alert.modal.open(
          'editBridgeDetails',
          function onSave(close) {
            ctrl.parent.update(ctrl.bridge, close)
          },
          onDelete
        )
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}
