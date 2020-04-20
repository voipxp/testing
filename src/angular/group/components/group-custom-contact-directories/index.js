import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupCustomContactDirectories', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['ACL','Alert', 'GroupCustomContactDirectoryService', '$q']
function controller(ACL, Alert, GroupCustomContactDirectoryService, $q) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.add = add
  ctrl.isGroupAdmin= ACL.is('Group')
  function onInit() {
    ctrl.loading = true
    $q.all([loadDirectories(), loadAvailableUsers()])
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadDirectories() {
    return GroupCustomContactDirectoryService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.directories = data
    })
  }

  function loadAvailableUsers() {
    return GroupCustomContactDirectoryService.users(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.users = data
    })
  }

  function loadDirectory(directory) {
    return GroupCustomContactDirectoryService.show(
      ctrl.serviceProviderId,
      ctrl.groupId,
      directory.name
    )
  }

  function filterUsers(allUsers, myUsers) {
    return _.filter(allUsers, function(user) {
      return !_.find(myUsers, { userId: user.userId })
    })
  }

  function add() {
    ctrl.availableUsers = angular.copy(ctrl.users)
    ctrl.editDirectory = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId,
      name: '',
      users: []
    }
    Alert.modal.open('groupDirectoryCreateModal', function onSave(close) {
      ctrl.editDirectory.name = ctrl.editDirectory.newName
      create(ctrl.editDirectory, close)
    })
  }

  function create(directory, callback) {
    Alert.spinner.open()
    GroupCustomContactDirectoryService.store(
      ctrl.serviceProviderId,
      ctrl.groupId,
      directory
    )
      .then(loadDirectories)
      .then(function() {
        Alert.notify.success('Directory Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function edit(directory) {
    Alert.spinner.open()
    loadDirectory(directory)
      .then(function(data) {
        ctrl.editDirectory = angular.copy(data)
        ctrl.editDirectory.newName = ctrl.editDirectory.name
        ctrl.availableUsers = filterUsers(ctrl.users, ctrl.editDirectory.users)
        Alert.modal.open(
          'groupDirectoryCreateModal',
          function onSave(close) {
            update(ctrl.editDirectory, close)
          },
          function onDelete(close) {
            Alert.confirm
              .open('Are you sure you want to delete this directory?')
              .then(function() {
                destroy(ctrl.editDirectory, close)
              })
          }
        )
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function destroy(directory, callback) {
    Alert.spinner.open()
    GroupCustomContactDirectoryService.destroy(
      ctrl.serviceProviderId,
      ctrl.groupId,
      directory.name
    )
      .then(loadDirectories)
      .then(function() {
        Alert.notify.warning('Directory Deleted')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function update(directory, callback) {
    Alert.spinner.open()
    GroupCustomContactDirectoryService.update(
      ctrl.serviceProviderId,
      ctrl.groupId,
      directory
    )
      .then(loadDirectories)
      .then(function() {
        Alert.notify.success('Settings Updated')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}
