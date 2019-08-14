import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userAnonymousCallRejection', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = ['Alert', 'UserAnonymousCallRejectionService', 'Module', '$q']
function controller(Alert, UserAnonymousCallRejectionService, Module, $q) {
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
    return Module.show('Anonymous Call Rejection').then(function(data) {
      ctrl.module = data
    })
  }

  function loadSettings() {
    return UserAnonymousCallRejectionService.show(ctrl.userId).then(function(data) {
      ctrl.settings = data
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editUserAnonymousCallRejection', function(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    UserAnonymousCallRejectionService.update(settings)
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
