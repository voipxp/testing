import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userAutomaticCallback', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = ['Alert', 'UserAutomaticCallbackService', 'Module', '$q']
function controller(Alert, UserAutomaticCallbackService, Module, $q) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit

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
    return Module.show('Automatic Callback').then(function(data) {
      ctrl.module = data
    })
  }

  function loadSettings() {
    return UserAutomaticCallbackService.show(ctrl.userId).then(function(data) {
      ctrl.settings = data
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editUserAutomaticCallBack', function onSave(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    UserAutomaticCallbackService.update(ctrl.userId, settings)
      .then(function(data) {
        ctrl.settings = data
      })
      // .then(loadSettings)
      .then(function() {
        Alert.notify.success('Settings Updated')
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
}
