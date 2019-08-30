import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userId', {
  template,
  controller,
  bindings: { userId: '<', groupId: '<', serviceProviderId: '<' }
})

controller.$inject = [
  'Alert',
  'UserIdService',
  'UserService',
  'Route',
  'GroupPolicyService',
  'ServiceProviderPolicyService',
  'ACL',
  '$q'
]
function controller(
  Alert,
  UserIdService,
  UserService,
  Route,
  GroupPolicyService,
  ServiceProviderPolicyService,
  ACL,
  $q
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.update = update
  ctrl.edit = edit
  ctrl.setUserId = setUserId

  function onInit() {
    ctrl.loading = true
    return $q
      .all([GroupPolicyService.load(), ServiceProviderPolicyService.load()])
      .then(function() {
        if (ACL.has('Reseller')) {
          ctrl.canEdit = true
        } else if (ACL.is('Group')) {
          ctrl.canEdit = GroupPolicyService.userProfileUpdate()
          ctrl.canDelete = GroupPolicyService.userDelete()
        } else if (ACL.is('Service Provider')) {
          ctrl.canEdit = ServiceProviderPolicyService.userProfileUpdate()
        }
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function edit() {
    if (!ctrl.canDelete) {
      Alert.modal.open('editUserIdModal', function(close) {
        update(ctrl.newUserId, close)
      })
    } else {
      Alert.modal.open(
        'editUserIdModal',
        function(close) {
          update(ctrl.newUserId, close)
        },
        function(close) {
          remove(close)
        }
      )
    }
  }

  function setUserId(event) {
    ctrl.newUserId = event.userId
  }

  function remove(callback) {
    Alert.confirm
      .open('Are you sure you want to remove ' + ctrl.userId + '?')
      .then(function() {
        Alert.spinner.open()
        return UserService.destroy(ctrl.userId)
          .then(function() {
            Alert.notify.success('User Removed')
            callback()
            Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'users')
          })
          .catch(function(error) {
            Alert.notify.danger(error)
          })
          .finally(function() {
            Alert.spinner.close()
          })
      })
  }

  function update(newUserId, callback) {
    Alert.spinner.open()
    return UserIdService.update(ctrl.userId, newUserId)
      .then(function() {
        Alert.notify.success('User ID Updated')
        callback()
        Route.open('users', ctrl.serviceProviderId, ctrl.groupId, newUserId)
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}
