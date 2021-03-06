import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('userPortalPasscode', {
  template,
  controller,
  bindings: {
    userId: '<',
    serviceProviderId: '<',
    groupId: '<'
  }
})

controller.$inject = [
  'Alert',
  'UserPortalPasscodeService',
  '$scope',
  'Session',
  'UserPermissionService'
]
function controller(
  Alert,
  UserPortalPasscodeService,
  $scope,
  Session,
  UserPermissionService
) {
  var ctrl = this
  ctrl.edit = edit
  ctrl.$onInit = activate

  ctrl.isUser = function() {
    return Session.data('loginType') === 'User'
  }

  function activate() {
    ctrl.passcode = {}
    ctrl.loading = true
    return UserPermissionService.load(ctrl.userId)
      .then(function(permission) {
        ctrl.hasService = permission.read('Voice Messaging User')
        if (ctrl.hasService) return loadPasscode()
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadPasscode() {
    return UserPortalPasscodeService.show(ctrl.userId).then(function(data) {
      ctrl.passcode = data
      return data
    })
  }

  function update(passcode, callback) {
    Alert.spinner.open()
    UserPortalPasscodeService.update(ctrl.userId, passcode)
      .then(function() {
        ctrl.editPasscode = {}
        Alert.notify.success('Passcode Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function edit() {
    if ($scope.editUserPortalPasscodeForm) {
      $scope.editUserPortalPasscodeForm.$setPristine()
    }
    ctrl.editPasscode = { userId: ctrl.userId }
    Alert.modal.open('editUserPortalPasscode', function(close) {
      update(ctrl.editPasscode, close)
    })
  }
}
