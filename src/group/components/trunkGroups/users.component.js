;(function() {
  angular.module('odin.group').component('groupTrunkGroupUsers', {
    templateUrl: 'group/components/trunkGroups/users.component.html',
    controller: Controller,
    require: { parent: '^groupTrunkGroup' }
  })

  function Controller(
    Alert,
    GroupTrunkGroupUserService,
    UserService,
    $q,
    $location,
    Route,
    Module
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.isPilotUser = isPilotUser
    ctrl.edit = edit
    ctrl.togglePilot = togglePilot
    ctrl.bulk = bulk
    ctrl.open = open

    function onInit() {
      ctrl.loading = true
      $q.all([loadUsers(), loadModules()])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadUsers() {
      ctrl.isLoadingUsers = true
      return GroupTrunkGroupUserService.index(
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId,
        ctrl.parent.trunkName
      )
        .then(function(data) {
          console.log('data', data)
          ctrl.users = _.map(data.users, function(user) {
            user.isPilotUser = isPilotUser(user)
            return user
          })
        })
        .finally(function() {
          ctrl.isLoadingUsers = false
        })
    }

    function loadModules() {
      return Module.load().then(function() {
        ctrl.canReadPilot = Module.read('Trunk Group - Pilot User')
        ctrl.canEditPilot = Module.update('Trunk Group - Pilot User')
        ctrl.canEditUsers = Module.update('Provisioning')
      })
    }

    function isPilotUser(user) {
      return ctrl.parent.trunk.pilotUserId === user.userId
    }

    function edit() {
      if (!ctrl.canEditUsers) return
      ctrl.availableUsers = []
      ctrl.assignedUsers = angular.copy(ctrl.users)
      Alert.modal.open('editGroupTrunkGroupUsers', function(close) {
        Alert.confirm
          .open('Are you sure you want to remove these Users?')
          .then(function() {
            removeUsers(ctrl.availableUsers, close)
          })
      })
    }

    function removeUsers(users, callback) {
      Alert.spinner.open()
      return Promise.all(users.map(removeUser))
        .then(loadUsers)
        .then(function() {
          Alert.notify.warning(users.length + ' Users Removed')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function removeUser(user) {
      return removeIfPilot(user).then(function() {
        var editUser = angular.copy(user)
        editUser.endpointType = 'none'
        editUser.trunkAddressing = null
        return UserService.update(editUser.userId, editUser)
      })
    }

    function removeIfPilot(user) {
      if (!ctrl.canEditPilot) return $q.when(true)
      return user.isPilotUser ? setPilot(null) : $q.when(true)
    }

    // This calls parent.update which handles its own spinner
    function togglePilot(user) {
      if (!ctrl.canEditPilot) return
      var message
      var userId
      if (user.isPilotUser) {
        message =
          'Are you sure you want to make ' + user.userId + ' the Pilot User?'
        userId = user.userId
      } else {
        message = 'Are you sure you want to remove the Pilot User?'
        userId = null
      }
      Alert.confirm.open(message).then(function() {
        return setPilot(userId).then(loadUsers)
      })
    }

    function setPilot(userId) {
      var trunk = angular.copy(ctrl.parent.trunk)
      trunk.pilotUserId = userId
      return ctrl.parent.update(trunk)
    }

    function bulk() {
      var returnTo = $location.url()
      $location.path('/bulk/user.create').search({
        serviceProviderId: ctrl.parent.serviceProviderId,
        groupId: ctrl.parent.groupId,
        returnTo: returnTo
      })
    }

    function open(user) {
      var returnTo = $location.url()
      Route.open(
        'users',
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId,
        user.userId
      ).search({ returnTo: returnTo })
    }
  }
})()
