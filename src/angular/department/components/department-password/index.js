import angular from 'angular'
import template from './index.html'

angular.module('odin.department').component('departmentChangePassword', {
  template,
  controller,
  bindings: { userId: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Alert',
  'GroupDepartmentAdminService',
  'AuthService',
  'PasswordModifyRequest',
  'Module',
  'Session',
  '$q'
]

function controller(
  Alert,
  GroupDepartmentAdminService,
  AuthService,
  PasswordModifyRequest,
  Module,
  Session,
  $q
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.permission = false

  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadSettings(), loadModule()])
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadModule() {
    return Module.show('Change Password').then(function(data) {
      ctrl.permission = data.permissions.update
      ctrl.module = data
    })
  }

  function loadSettings() {
    // ctrl.isCurrentUser = ctrl.userId === Session.data('userId')
    ctrl.settings = {
      userId: Session.data('userId'),
      password: null,
      oldPassword: null
    }
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editDepartmentChangePassword', function onSave(close) {
      if (!ctrl.isCurrentUser) {
        delete ctrl.settings.oldPassword
      }
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    ctrl.changePassword = {
      userId: settings.userId,
      newPassword: settings.password,
      oldPassword: settings.oldPassword
    }
    if (settings.password) delete settings.password
    updateSelfPassword(ctrl.changePassword, callback)
  }
  function updateSelfPassword(user, callback) {
    return PasswordModifyRequest.updatePasswords(user)
      .then(loadSettings)
      .then(function() {
        updateSession(user.userId, user.newPassword)
        Alert.notify.success('Password Changed')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
  // so we don't have to login again
  function updateSession(userId, password) {
    return AuthService.token(userId, password).then(Session.set)
  }
}
