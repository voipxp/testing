import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectUsers', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    users: '<',
    onUpdate: '&'
  }
})

controller.$inject = ['Alert', 'UserService', 'EventEmitter']
function controller(Alert, UserService, EventEmitter) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.complete = complete

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
    return UserService.index(ctrl.serviceProviderId, ctrl.groupId).then(
      function(data) {
        // set selected users to any that were sent in
        // so long as they still exist
        ctrl.selectedUsers = []
        _.forEach(ctrl.users, function(user) {
          if (_.find(data, { userId: user.userId })) {
            ctrl.selectedUsers.push(angular.copy(user))
          }
        })
        // set availableUsers to those that aren't already selected
        ctrl.availableUsers = _.filter(data, function(user) {
          return !_.find(ctrl.selectedUsers, { userId: user.userId })
        })
      }
    )
  }

  function complete() {
    ctrl.onUpdate(EventEmitter({ users: ctrl.selectedUsers }))
  }
}
