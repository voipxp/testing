import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userRemoteOffice', {
  template,
  controller,
  bindings: { userId: '<', showQuick: '<' }
})

controller.$inject = ['Alert', 'UserRemoteOfficeService', '$q', 'Module']
function controller(Alert, UserRemoteOfficeService, $q, Module) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.toggle = toggle
  ctrl.options = UserRemoteOfficeService.options

  function onInit() {
    ctrl.loading = true
    $q.all([loadSettings(), loadModule()])
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadModule() {
    return Module.show('Remote Office').then(function(data) {
      ctrl.module = data
    })
  }

  function loadSettings() {
    return UserRemoteOfficeService.show(ctrl.userId).then(function(data) {
      ctrl.settings = data
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editUserRemoteOffice', function onSave(close) {
      update(ctrl.editSettings, close)
    })
  }

  function toggle() {
    if (!ctrl.settings.remoteOfficePhoneNumber) {
      Alert.notify.warning('Please Configure a Phone Number')
      ctrl.settings.isActive = !ctrl.settings.isActive
      return edit()
    }
    ctrl.loading = true
    UserRemoteOfficeService.update(ctrl.userId, ctrl.settings)
      .then(loadSettings)
      .then(function() {
        Alert.notify.success('Remote Office Updated')
      })
      .catch(function(error) {
        ctrl.settings.isActive = !ctrl.settings.isActive
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    UserRemoteOfficeService.update(ctrl.userId, settings)
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
