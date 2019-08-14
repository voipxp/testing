import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userCallingLineIdDeliveryBlocking', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = ['Alert', 'UserCallingLineIdDeliveryBlockingService', 'Module', '$q']
function controller(Alert, UserCallingLineIdDeliveryBlockingService, Module, $q) {
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
    return Module.show('Calling Line ID Delivery Blocking').then(function(data) {
      ctrl.module = data
    })
  }

  function loadSettings() {
    return UserCallingLineIdDeliveryBlockingService.show(ctrl.userId).then(function(data) {
      ctrl.settings = data
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editUserCallingLineIdDeliveryBlocking', function(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    UserCallingLineIdDeliveryBlockingService.update(ctrl.userId, settings)
      // .then(loadSettings)
      .then(function(data) {
        ctrl.settings = data
      })
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
