;(function() {
  angular.module('odin.group').component('meetMeBridgeUsers', {
    templateUrl: 'group/components/meetMe/bridge/users.component.html',
    controller: Controller,
    require: { parent: '^meetMeBridge' }
  })

  function Controller(Alert, $q, GroupMeetMeConferencingUserService) {
    var ctrl = this

    ctrl.edit = edit
    ctrl.users = []
    ctrl.availableUsers = []
    ctrl.assignedUsers = []

    function activate() {
      Alert.spinner.open()
      return loadAvailableUsers()
        .catch(function(error) {
          Alert.notify.danger(error)
          return $q.reject(error.data)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function loadAvailableUsers() {
      return GroupMeetMeConferencingUserService.index(
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId
      ).then(function(data) {
        ctrl.users = data
        return data
      })
    }

    function edit() {
      if (!ctrl.parent.module.permissions.update) return
      activate().then(function() {
        ctrl.assignedUsers = angular.copy(ctrl.parent.bridge.users)
        ctrl.availableUsers = _.filter(ctrl.users, function(user) {
          return !_.find(ctrl.assignedUsers, { userId: user.userId })
        })
        Alert.modal.open('editBridgeUsers', function onSave(close) {
          var bridge = angular.copy(ctrl.parent.bridge)
          bridge.users = ctrl.assignedUsers
          return ctrl.parent.update(bridge, close)
        })
      })
    }
  }
})()
