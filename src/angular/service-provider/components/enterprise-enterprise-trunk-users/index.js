import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.serviceProvider').component('enterpriseEnterpriseTrunkUsers', {
  template,
  controller,
  require: { parent: '^enterpriseEnterpriseTrunk' }
})

controller.$inject = [
  'Alert',
  'EnterpriseEnterpriseTrunkUserService',
  'EnterpriseEnterpriseTrunkAvailableUserService'
]
function controller(
  Alert,
  EnterpriseEnterpriseTrunkUserService,
  EnterpriseEnterpriseTrunkAvailableUserService
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
    return EnterpriseEnterpriseTrunkUserService.index(
      ctrl.parent.serviceProviderId,
      ctrl.parent.trunkName
    ).then(function(data) {
      ctrl.users = data.users
      return data
    })
  }

  function loadAvailableUsers() {
    return EnterpriseEnterpriseTrunkAvailableUserService.index(ctrl.parent.serviceProviderId).then(
      function(data) {
        ctrl.assignedUsers = angular.copy(ctrl.users)
        ctrl.availableUsers = _.filter(data.users, function(user) {
          return !_.find(ctrl.assignedUsers, { userId: user.userId })
        })
        return data
      }
    )
  }

  function edit() {
    Alert.spinner.open()
    loadAvailableUsers()
      .then(function() {
        Alert.modal.open('editEnterpriseEnterpriseTrunkUsers', function onSave(close) {
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
      enterpriseTrunkName: ctrl.parent.trunkName,
      users: users
    }
    Alert.spinner.open()
    EnterpriseEnterpriseTrunkUserService.update(
      ctrl.parent.serviceProviderId,
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
