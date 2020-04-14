import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupCallParkGroup', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<', name: '<' }
})

controller.$inject = [
  'Alert',
  'GroupCallParkService',
  'GroupCallParkGroupService',
  'Route',
  'Module',
  '$location'
]
function controller(
  Alert,
  GroupCallParkService,
  GroupCallParkGroupService,
  Route,
  Module,
  $location
) {
  var ctrl = this

  ctrl.open = open
  ctrl.options = GroupCallParkGroupService.options
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.select = select
  ctrl.onSelect = onSelect
  ctrl.selectUsers = selectUsers

  function onInit() {
    ctrl.name = $location.search().name || ctrl.name
    ctrl.loading = true
    loadGroup()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadGroup() {
    return GroupCallParkGroupService.show(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.name
    ).then(function(data) {
      ctrl.group = data
    })
  }

  function edit() {
    ctrl.editGroup = angular.copy(ctrl.group)
    ctrl.editGroup.newName = ctrl.group.name
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
      'groupCallParkGroupEditModal',
      function(close) {
        update(ctrl.editGroup, close)
      },
      deleteAction
    )
  }

  function select() {
    Alert.spinner.open()
    GroupCallParkService.recall(ctrl.serviceProviderId, ctrl.groupId)
      .then(function(data) {
        ctrl.users = data
        Alert.modal.open('groupCallParkRecallUserModal')
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function onSelect(user) {
    ctrl.editGroup.recallAlternateUserId = user && user.userId
    Alert.modal.close('groupCallParkRecallUserModal')
  }

  function selectUsers() {
    Alert.spinner.open()
    GroupCallParkGroupService.users(
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
        Alert.modal.open('groupCallParkGroupUsersModal', function(close) {
          var editGroup = angular.copy(ctrl.group)
          editGroup.users = ctrl.selectedUsers
          update(editGroup, close)
        })
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function update(group, callback) {
    Alert.spinner.open()
    GroupCallParkGroupService.update(group)
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
    GroupCallParkGroupService.destroy(
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

  function open(name) {
    if (name) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'groupService',
        'callPark',
        'group',
        name
      )
    } else {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'callPark')
    }
  }
}
