;(function() {
  angular.module('odin.group').component('groupTrunkGroupHostedUsers', {
    templateUrl: 'group/components/trunkGroups/hostedUsers.component.html',
    controller: Controller,
    require: { parent: '^groupTrunkGroup' }
  })

  function Controller(Alert, GroupTrunkGroupUserService, $q) {
    var ctrl = this
    ctrl.edit = edit

    function edit() {
      if (!ctrl.parent.module.permissions.update) return

      loadAvailableUsers().then(function() {
        Alert.modal.open('editGroupTrunkGroupHostedUsers', function(close) {
          update(ctrl.assignedUsers, close)
        })
      })
    }

    function loadAvailableUsers() {
      Alert.spinner.open()
      return GroupTrunkGroupUserService.hosted(
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId,
        ctrl.parent.trunkName
      )
        .then(function(data) {
          console.log('DATA', data)
          var users = data.users
          ctrl.assignedUsers = angular.copy(ctrl.parent.trunk.users)
          ctrl.availableUsers = _.filter(users, function(user) {
            return !_.find(ctrl.assignedUsers, { userId: user.userId })
          })
        })
        .catch(function(error) {
          Alert.notify.danger(error)
          return $q.reject(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function update(users, callback) {
      var trunk = angular.copy(ctrl.parent.trunk)
      trunk.users = users
      ctrl.parent.update(trunk, callback)
    }
  }
})()
