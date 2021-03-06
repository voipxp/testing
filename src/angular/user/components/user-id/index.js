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
  'GroupWebPolicyService',
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
  GroupWebPolicyService,
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
      .all([GroupPolicyService.load(), ServiceProviderPolicyService.load(), GroupWebPolicyService.load()])
      .then(function() {
        ctrl.canEdit = true
        ctrl.canDelete = true
        if (ACL.has('Reseller')) {
          ctrl.canEdit = true
          ctrl.canDelete = true
        } else if (ACL.is('Group')) {
          ctrl.canEdit = GroupPolicyService.userIdUpdate()
          ctrl.canDelete = GroupPolicyService.userDelete()
        } else if (ACL.is('Service Provider')) {
          ctrl.canEdit = ServiceProviderPolicyService.userProfileUpdate()
          ctrl.canDelete = ctrl.canEdit
        } else if(ACL.is('Group Department')) {
          ctrl.canEdit = GroupWebPolicyService.departmentAdminUserDelete()
          ctrl.canDelete = GroupWebPolicyService.departmentAdminUserIdUpdate()
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
            if(ACL.is('Group Department')) {  Route.open('department', ctrl.serviceProviderId, ctrl.groupId, 'users')  }
            else {  Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'users')  }
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
