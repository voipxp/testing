import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.department').component('departmentChangePassword', {
  template,
  controller,
  bindings: { userId: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'UserAuthenticationService', 'Module', '$q']
function controller(Alert, UserAuthenticationService, Module, $q) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.options = UserAuthenticationService.options

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
      ctrl.module = data
    })
  }

  function loadSettings() {
	  ctrl.settings = 'AnshuDept@parkbenchsolutions.com'
    /*return UserAuthenticationService.show(ctrl.userId).then(function(data) {
    return UserAuthenticationService.show(ctrl.userId).then(function(data) {
      ctrl.settings = data
    }) */
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editDepartmentChangePassword', function onSave(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    if (!settings.newPassword) {
      delete settings.newPassword
    }
    Alert.spinner.open()
    UserAuthenticationService.update(ctrl.userId, settings)
      .then(loadSettings)
      .then(function() {
        Alert.notify.success('Settings Updated')
        if (_.isFunction(callback)) callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}
