import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userCallForwardingAlwaysSecondary', {
  template,
  controller,
  bindings: { userId: '<', showQuick: '<' }
})

controller.$inject = [
  '$q',
  'Alert',
  'UserCallForwardingAlwaysSecondaryService',
  'Module'
]
function controller(
  $q,
  Alert,
  UserCallForwardingAlwaysSecondaryService,
  Module
) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.toggle = toggle

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

  function loadSettings() {
    return UserCallForwardingAlwaysSecondaryService.show(ctrl.userId).then(
      function(data) {
        ctrl.settings = data
      }
    )
  }

  function loadModule() {
    return Module.show('Call Forwarding Always Secondary').then(function(data) {
      ctrl.module = data
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editUserCallForwardingAlwaysSecondary', function onSave(
      close
    ) {
      update(ctrl.editSettings, close)
    })
  }

  function toggle() {
    if (!ctrl.settings.forwardToPhoneNumber) {
      Alert.notify.warning('Please Configure a Phone Number')
      ctrl.settings.isActive = !ctrl.settings.isActive
      return ctrl.edit()
    }
    ctrl.loading = true
    UserCallForwardingAlwaysSecondaryService.update(ctrl.userId, ctrl.settings)
      // .then(loadSettings)
      .then(function(data) {
        ctrl.settings = data
      })
      .then(function() {
        Alert.notify.success('Call Forwarding Always Secondary Updated')
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
    UserCallForwardingAlwaysSecondaryService.update(ctrl.userId, settings)
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
