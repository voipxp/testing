import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupEnterpriseTrunkUsers', {
  template,
  controller,
  require: { parent: '^groupEnterpriseTrunk' }
})

controller.$inject = [
  'Alert',
  'GroupEnterpriseTrunkUserService',
  'GroupEnterpriseTrunkAvailableUserService'
]
function controller(
  Alert,
  GroupEnterpriseTrunkUserService,
  GroupEnterpriseTrunkAvailableUserService
) {
  var ctrl = this
  ctrl.$onInit = activate
  ctrl.edit = edit

  function activate() {
    ctrl.trunkName = ctrl.parent.trunkName
    ctrl.loading = true
    loadAssignedUsers()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadAssignedUsers() {
    return GroupEnterpriseTrunkUserService.index(
      ctrl.parent.serviceProviderId,
      ctrl.parent.groupId,
      ctrl.parent.trunkName
    ).then(function(data) {
      ctrl.users = data.users
      return data
    })
  }

  function loadAvailableUsers() {
    return GroupEnterpriseTrunkAvailableUserService.index(
      ctrl.parent.serviceProviderId,
      ctrl.parent.groupId
    ).then(function(data) {
      ctrl.assignedUsers = angular.copy(ctrl.users)
      ctrl.availableUsers = _.filter(data.users, function(user) {
        return !_.find(ctrl.assignedUsers, { userId: user.userId })
      })
      return data
    })
  }

  function edit() {
    Alert.spinner.open()
    loadAvailableUsers()
      .then(function() {
        Alert.modal.open('editGroupEnterpriseTrunkUsers', function(close) {
          update(ctrl.assignedUsers, close)
        })
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function update(users, callback) {
    var newUsers = {
      serviceProviderId: ctrl.parent.serviceProviderId,
      groupId: ctrl.parent.groupId,
      enterpriseTrunkName: ctrl.parent.trunkName,
      users: users
    }
    Alert.spinner.open()
    GroupEnterpriseTrunkUserService.update(
      ctrl.parent.serviceProviderId,
      ctrl.parent.groupId,
      ctrl.parent.trunkName,
      newUsers
    )
      .then(loadAssignedUsers)
      .then(function() {
        Alert.notify.success('Users Updated')
        if (_.isFunction(callback)) {
          callback(0)
        }
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}
