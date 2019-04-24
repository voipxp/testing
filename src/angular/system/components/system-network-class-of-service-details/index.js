import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.system').component('systemNetworkClassOfServiceDetails', {
  template,
  controller,
  bindings: { name: '<' }
})

controller.$inject = [
  'Alert',
  'SystemNetworkClassOfServiceService',
  'SystemCommunicationBarringProfileService',
  '$q',
  'Route'
]
function controller(
  Alert,
  SystemNetworkClassOfServiceService,
  SystemCommunicationBarringProfileService,
  $q,
  Route
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.setPrimary = setPrimary

  function onInit() {
    ctrl.loading = true
    loadService()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadService() {
    return SystemNetworkClassOfServiceService.show(ctrl.name).then(function(
      data
    ) {
      ctrl.service = data
    })
  }

  function loadProfiles() {
    Alert.spinner.open()
    return SystemCommunicationBarringProfileService.index()
      .then(function(data) {
        ctrl.profiles = data
      })
      .catch(function(error) {
        Alert.notify.danger(error)
        $q.reject(error)
      })
      .finally(Alert.spinner.close)
  }

  function setPrimary(i) {
    for (var index = 0; index < 10; index++) {
      var key = ['communicationBarringProfile' + index, 'isPrimary']
      _.set(ctrl.editService, key, i === index)
    }
  }

  function edit() {
    ctrl.editService = angular.copy(ctrl.service)
    ctrl.editService.newName = ctrl.service.name
    loadProfiles().then(function() {
      Alert.modal.open(
        'systemNetworkClassOfServiceEditModal',
        function(close) {
          update(ctrl.editService, close)
        },
        function(close) {
          Alert.confirm
            .open(
              'Are you sure you want to remove this Network Class of Service?'
            )
            .then(function() {
              destroy(close)
            })
        }
      )
    })
  }

  function update(service, callback) {
    Alert.spinner.open()
    SystemNetworkClassOfServiceService.update(ctrl.name, service)
      .then(loadService)
      .then(function() {
        Alert.notify.success('Network Class of Service Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function destroy(callback) {
    Alert.spinner.open()
    SystemNetworkClassOfServiceService.destroy(ctrl.name)
      .then(function() {
        Alert.notify.warning('Network Class of Service Removed')
        callback()
        back()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function back() {
    Route.open('system', 'networkClassOfServices')
  }
}
