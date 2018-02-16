;(function() {
  angular.module('odin.group').component('groupTrunkGroupUsers', {
    templateUrl: 'group/components/trunkGroups/users.component.html',
    controller: Controller,
    require: { parent: '^groupTrunkGroup' }
  })

  function Controller(
    Alert,
    GroupTrunkGroupService,
    GroupTrunkGroupUserService,
    UserService,
    $q
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.isPilotUser = isPilotUser
    ctrl.edit = edit
    ctrl.togglePilot = togglePilot
    ctrl.remove = remove

    function onInit() {
      ctrl.loading = true
      loadUsers()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadUsers() {
      return GroupTrunkGroupUserService.index(
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId,
        ctrl.parent.trunkName
      ).then(function(data) {
        ctrl.users = data.users
        console.log('users', data)
        return data
      })
    }

    function isPilotUser(user) {
      if (!user || !ctrl.parent.trunk) return
      return ctrl.parent.trunk.pilotUserId === user.userId
    }

    function edit(user) {
      if (!ctrl.parent.module.permissions.update) return
      ctrl.editUser = angular.copy(user)
      ctrl.editUser.isPilotUser = isPilotUser(user)
      Alert.modal.open('groupTrunkGroupUsersModal', null, function(close) {
        destroy(ctrl.editUser, close)
      })
    }

    function remove(user) {
      Alert.confirm
        .open('Are you sure you want to remove this Trunk Group from the User?')
        .then(function() {
          removeIfPilot(user)
            .then(function() {
              return removeUser(user)
            })
            .then(loadUsers)
            .then(function() {
              Alert.notify.success('User Removed From Trunk Group')
              Alert.modal.closeAll()
            })
            .catch(function(error) {
              Alert.notify.danger(error)
            })
        })
    }

    function removeUser(user) {
      Alert.spinner.open()
      var editUser = angular.copy(user)
      editUser.endpointType = 'none'
      return UserService.update(editUser.userId, editUser).finally(function() {
        Alert.spinner.close()
      })
    }

    function destroy(user) {
      Alert.confirm
        .open('Are you sure you want to Delete this user?')
        .then(function() {
          removeIfPilot(user)
            .then(function() {
              Alert.spinner.open()
              return UserService.destroy(user.userId).finally(function() {
                Alert.spinner.close()
              })
            })
            .then(loadUsers)
            .then(function() {
              Alert.notify.success('User Deleted')
              Alert.modal.closeAll()
            })
            .catch(function(error) {
              Alert.notify.danger(error)
              return $q.reject(error)
            })
        })
    }

    function removeIfPilot(user) {
      return isPilotUser(user) ? setPilot(null) : $q.when(true)
    }

    // This calls parent.update which handles its own spinner
    function togglePilot(user) {
      var message
      var userId
      if (isPilotUser(user)) {
        message = 'Are you sure you want to remove the Pilot User?'
        userId = null
      } else {
        message =
          'Are you sure you want to make ' + user.userId + ' the Pilot User?'
        userId = user.userId
      }
      Alert.confirm.open(message).then(function() {
        setPilot(userId).then(function() {
          Alert.modal.closeAll()
        })
      })
    }

    function setPilot(userId) {
      var trunk = angular.copy(ctrl.parent.trunk)
      trunk.pilotUserId = userId
      return ctrl.parent.update(trunk)
    }
  }
})()
