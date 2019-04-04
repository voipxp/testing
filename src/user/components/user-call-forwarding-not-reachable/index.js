import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userCallForwardingNotReachable', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = [
  'Alert',
  'UserCallForwardingNotReachableService',
  'Module',
  '$q'
]
function controller(Alert, UserCallForwardingNotReachableService, Module, $q) {
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
    return Module.show('Call Forwarding Not Reachable').then(function(data) {
      ctrl.module = data
    })
  }

  function loadSettings() {
    return UserCallForwardingNotReachableService.show(ctrl.userId).then(
      function(data) {
        ctrl.settings = data
      }
    )
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    // We aren't updated callCenters here
    // delete ctrl.editSettings.callCenters;
    Alert.modal.open('editUserCallForwardingNotReachable', function(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    UserCallForwardingNotReachableService.update(ctrl.userId, settings)
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
}
