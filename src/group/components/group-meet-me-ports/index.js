import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupMeetMePorts', {
  template,
  controller,
  require: { parent: '^groupMeetMe' }
})

controller.$inject = ['Alert', 'GroupMeetMeConferencingPortService']
function controller(Alert, GroupMeetMeConferencingPortService) {
  var ctrl = this

  ctrl.edit = edit
  ctrl.$onInit = activate

  function activate() {
    ctrl.loading = true
    return loadPorts()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadPorts() {
    return GroupMeetMeConferencingPortService.index(
      ctrl.parent.serviceProviderId,
      ctrl.parent.groupId
    ).then(function(data) {
      ctrl.ports = data
    })
  }

  function edit() {
    ctrl.editPorts = angular.copy(ctrl.ports)
    Alert.modal.open('edit-PortAllocation', function onSave(close) {
      return update(close)
    })
  }

  function update(callback) {
    ctrl.editPorts.serviceProviderId = ctrl.parent.serviceProviderId
    ctrl.editPorts.groupId = ctrl.parent.groupId
    Alert.spinner.open()
    return GroupMeetMeConferencingPortService.update(ctrl.editPorts)
      .then(loadPorts)
      .then(function() {
        Alert.notify.success('Meet-Me Settings Saved')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
