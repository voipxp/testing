import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userInternalCallingLineIdDelivery', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = [
  'Alert',
  'UserInternalCallingLineIdDeliveryService',
  '$q',
  'Module'
]
function controller(
  Alert,
  UserInternalCallingLineIdDeliveryService,
  $q,
  Module
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.options = UserInternalCallingLineIdDeliveryService.options

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
    return Module.show('Internal Calling Line ID Delivery').then(function(
      data
    ) {
      ctrl.module = data
    })
  }

  function loadSettings() {
    return UserInternalCallingLineIdDeliveryService.show(ctrl.userId).then(
      function(data) {
        ctrl.settings = data
      }
    )
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editUserInternalCallingLineIdDelivery', function(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    UserInternalCallingLineIdDeliveryService.update(ctrl.userId, settings)
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
