import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userBusyLampField', {
  template,
  controller,
  bindings: { userId: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  '$q',
  'Alert',
  'UserBusyLampFieldService',
  'ACL',
  'Module'
]
function controller($q, Alert, UserBusyLampFieldService, ACL, Module) {
  var ctrl = this
  ctrl.options = UserBusyLampFieldService.options
  ctrl.hasPermission = ACL.has
  ctrl.edit = edit
  ctrl.editUsers = editUsers
  ctrl.onUpdateListURI = onUpdateListURI
  ctrl.$onInit = onInit

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
    return Module.show('Busy Lamp Field').then(function(data) {
      ctrl.module = data
    })
  }

  function loadSettings() {
    return UserBusyLampFieldService.show(ctrl.userId).then(function(data) {
      ctrl.settings = data
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editUserBusyLampField', function onSave(close) {
      update(ctrl.editSettings, close)
    })
  }

  function onUpdateListURI(event) {
    ctrl.editSettings.listURI = event.userId
  }

  function editUsers() {
    if (!ctrl.module.permissions.update) return
    ctrl.editSettings = angular.copy(ctrl.settings)
    loadAvailableUsers().then(function(available) {
      ctrl.available = _.filter(available, function(user) {
        return !_.find(ctrl.editSettings.users, { userId: user.userId })
      })
      Alert.modal.open('editUserBusyLampFieldUsers', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    UserBusyLampFieldService.update(ctrl.userId, settings)
      // .then(loadSettings)
      .then(function(data) {
        ctrl.settings = data
      })
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

  function loadAvailableUsers() {
    Alert.spinner.open()
    return UserBusyLampFieldService.users(ctrl.userId)
      .then(function(data) {
        return data.users
      })
      .catch(function(error) {
        Alert.notify.danger(error)
        return $q.reject(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}
