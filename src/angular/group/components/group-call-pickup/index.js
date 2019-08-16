import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupCallPickup', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupCallPickupService', 'Route', 'Module', '$location']
function controller(Alert, GroupCallPickupService, Route, Module, $location) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.edit = edit
  ctrl.users = users

  function onInit() {
    ctrl.name = $location.search().name
    ctrl.loading = true
    loadGroup()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadGroup() {
    return GroupCallPickupService.show(ctrl.serviceProviderId, ctrl.groupId, ctrl.name).then(
      function(data) {
        ctrl.group = data
      }
    )
  }

  function edit() {
    ctrl.editGroup = angular.copy(ctrl.group)
    ctrl.editGroup.newName = ctrl.editGroup.name
    var deleteAction
    if (Module.delete(ctrl.module)) {
      deleteAction = function(close) {
        Alert.confirm.open('Are you sure you want to delete this Group?').then(function() {
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
    GroupCallPickupService.users(ctrl.serviceProviderId, ctrl.groupId, ctrl.name)
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
    if (name) {
      return Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'callPickup',
        'group'
      ).search({ name: name })
    } else {
      return Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'callPickup')
    }
  }

  function update(group, callback) {
    Alert.spinner.open()
    GroupCallPickupService.update(group)
      .then(function() {
        return group.newName && group.newName !== ctrl.group.name
          ? open(group.newName)
          : loadGroup()
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
    GroupCallPickupService.destroy(ctrl.serviceProviderId, ctrl.groupId, group.name)
      .then(function() {
        Alert.notify.warning('Group Removed')
        callback()
        open()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
