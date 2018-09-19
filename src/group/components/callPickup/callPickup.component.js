;(function() {
  angular.module('odin.group').component('groupCallPickup', {
    templateUrl: 'group/components/callPickup/callPickup.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    Alert,
    GroupCallPickupService,
    $routeParams,
    Route,
    Module
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.name = $routeParams.name
    ctrl.open = open
    ctrl.edit = edit
    ctrl.users = users

    function onInit() {
      ctrl.loading = true
      loadGroup()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadGroup() {
      return GroupCallPickupService.show(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.name
      ).then(function(data) {
        ctrl.group = data
        console.log('group', data)
      })
    }

    function edit() {
      ctrl.editGroup = angular.copy(ctrl.group)
      ctrl.editGroup.newName = ctrl.editGroup.name
      var deleteAction
      if (Module.delete(ctrl.module)) {
        deleteAction = function(close) {
          Alert.confirm
            .open('Are you sure you want to delete this Group?')
            .then(function() {
              remove(ctrl.editGroup, close)
            })
        }
      }
      Alert.modal.open(
        'groupCallPickupEditModal',
        function(close) {
          update(ctrl.editGroup, close)
        },
        deleteAction
      )
    }

    function users() {
      Alert.spinner.open()
      GroupCallPickupService.users(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.name
      )
        .then(function(data) {
          ctrl.availableUsers = _.filter(data, function(user) {
            return !_.find(ctrl.group.users, { userId: user.userId })
          })
          ctrl.selectedUsers = ctrl.group.users
        })
        .then(function() {
          Alert.modal.open('groupCallPickupUsersModal', function(close) {
            var editGroup = angular.copy(ctrl.group)
            editGroup.users = ctrl.selectedUsers
            update(editGroup, close)
          })
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function open(name) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'callPickup',
        name
      )
    }

    function update(group, callback) {
      Alert.spinner.open()
      GroupCallPickupService.update(group)
        .then(function() {
          if (group.newName && group.newName !== ctrl.group.name) {
            return open(group.newName)
          } else {
            return loadGroup()
          }
        })
        .then(function() {
          Alert.notify.success('Group Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function remove(group, callback) {
      Alert.spinner.open()
      GroupCallPickupService.destroy(
        ctrl.serviceProviderId,
        ctrl.groupId,
        group.name
      )
        .then(function() {
          Alert.notify.warning('Group Removed')
          callback()
          open()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
