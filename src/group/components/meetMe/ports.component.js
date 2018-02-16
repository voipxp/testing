;(function() {
  angular.module('odin.group').component('groupMeetMePorts', {
    templateUrl: 'group/components/meetMe/ports.component.html',
    controller: Controller,
    require: { parent: '^groupMeetMe' }
  })

  function Controller(Alert, GroupMeetMeConferencingPortService) {
    var ctrl = this

    ctrl.edit = edit
    ctrl.$onInit = activate

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
        console.log('ports', data)
        return data
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
})()
