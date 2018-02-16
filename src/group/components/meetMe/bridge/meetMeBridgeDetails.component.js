;(function() {
  angular.module('odin.group').component('meetMeBridgeDetails', {
    templateUrl:
      'group/components/meetMe/bridge/meetMeBridgeDetails.component.html',
    controller: Controller,
    require: { parent: '^meetMeBridge' }
  })

  function Controller(Alert, GroupMeetMeConferencingPortService) {
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
        console.log('ports', data)
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
              console.log('editDetails', ctrl.bridge)
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
})()
