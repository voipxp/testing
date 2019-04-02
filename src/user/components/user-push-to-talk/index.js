import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userPushToTalk', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = ['Alert', 'UserPushToTalkService', 'ACL', '$q', 'Module']
function controller(Alert, UserPushToTalkService, ACL, $q, Module) {
  var ctrl = this
  ctrl.options = UserPushToTalkService.options
  ctrl.users = []
  ctrl.assignedUsers = []
  ctrl.availableUsers = []
  ctrl.domains = []
  ctrl.hasPermission = ACL.has
  ctrl.edit = edit
  ctrl.editUsers = editUsers
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
    return Module.show('Push to Talk').then(function(data) {
      ctrl.module = data
    })
  }

  function loadSettings() {
    return UserPushToTalkService.show(ctrl.userId).then(function(data) {
      ctrl.settings = data
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editUserPushToTalk', function onSave(close) {
      update(ctrl.editSettings, close)
    })
  }

  function editUsers() {
    if (!ctrl.module.permissions.update) return
    loadAvailableUsers().then(function(available) {
      ctrl.assignedUsers = angular.copy(ctrl.settings.users)
      ctrl.availableUsers = _.filter(available, function(user) {
        return !_.find(ctrl.assignedUsers, { userId: user.userId })
      })
      Alert.modal.open('editUserPushToTalkUsers', function onSave(close) {
        updateUsers(ctrl.assignedUsers, close)
      })
    })
  }

  function updateUsers(users, callback) {
    Alert.spinner.open()
    var object = angular.copy(ctrl.settings)
    object.users = users
    UserPushToTalkService.update(ctrl.userId, object)
      .then(loadSettings)
      .then(function() {
        Alert.notify.success('Users Updated')
        if (_.isFunction(callback)) {
          callback()
        }
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function update(settings, callback) {
    if (ACL.is('User')) {
      delete settings.listURI
    }
    if (ACL.has('Group')) {
      settings.listURI = ctrl.prefix + '@' + ctrl.suffix
    }
    Alert.spinner.open()
    UserPushToTalkService.update(ctrl.userId, settings)
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

  function loadAvailableUsers() {
    Alert.spinner.open()
    return UserPushToTalkService.users(ctrl.userId)
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
