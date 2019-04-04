import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.serviceProvider').component('serviceProviderMeetMe', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = [
  '$routeParams',
  'Alert',
  'ServiceProviderMeetMeConferencingPortsService'
]
function controller(
  $routeParams,
  Alert,
  ServiceProviderMeetMeConferencingPortsService
) {
  var ctrl = this

  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.edit = edit
  ctrl.update = update
  ctrl.$onInit = activate

  function activate() {
    ctrl.loading = true
    return loadPorts()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadPorts() {
    return ServiceProviderMeetMeConferencingPortsService.show(
      ctrl.serviceProviderId
    ).then(function(data) {
      ctrl.ports = data
      return data
    })
  }

  function edit() {
    ctrl.editPorts = angular.copy(ctrl.ports)
    Alert.modal.open('edit-PortAllocation', function onSave(close) {
      return update(close)
    })
  }

  function update(callback) {
    Alert.spinner.open()
    return ServiceProviderMeetMeConferencingPortsService.update(
      ctrl.serviceProviderId,
      ctrl.editPorts
    )
      .then(loadPorts)
      .then(function() {
        Alert.notify.success('Meet-Me Settings Saved')
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
