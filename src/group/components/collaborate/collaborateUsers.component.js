;(function() {
  angular.module('odin.group').component('groupCollaborateUsers', {
    templateUrl: 'group/components/collaborate/collaborateUsers.component.html',
    controller: Controller,
    require: { parent: '^^groupCollaborateBridge' }
  })

  function Controller(Alert, GroupCollaborateService) {
    var ctrl = this
    ctrl.edit = edit

    ctrl.columns = [
      {
        key: 'userId',
        label: 'User ID'
      },
      {
        key: 'lastName',
        label: 'Last Name'
      },
      {
        key: 'firstName',
        label: 'First Name'
      },
      {
        key: 'phoneNumber',
        label: 'Phone Number'
      },
      {
        key: 'extension',
        label: 'Extension'
      },
      {
        key: 'department',
        label: 'Department'
      }
    ]

    function loadAvailableUsers() {
      return GroupCollaborateService.users(
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId
      )
    }

    function edit() {
      if (ctrl.parent.bridge.isDefault) return
      Alert.spinner.open()
      loadAvailableUsers()
        .then(function(users) {
          ctrl.editBridge = angular.copy(ctrl.parent.bridge)
          ctrl.availableUsers = _.filter(users, function(user) {
            return !_.find(ctrl.editBridge.users, { userId: user.userId })
          })
          Alert.modal.open('editGroupCollaborateUsers', function(close) {
            ctrl.parent.update(ctrl.editBridge, close)
          })
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
