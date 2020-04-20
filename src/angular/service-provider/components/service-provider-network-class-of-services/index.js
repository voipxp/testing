import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular
  .module('odin.serviceProvider')
  .component('serviceProviderNetworkClassOfServices', {
    template,
    controller,
    bindings: {
      serviceProviderId: '<'
    }
  })

controller.$inject = [
  'Alert',
  'ServiceProviderNetworkClassOfServiceService',
  'SystemNetworkClassOfServiceService',
  'ACL',
  '$q'
]
function controller(
  Alert,
  ServiceProviderNetworkClassOfServiceService,
  SystemNetworkClassOfServiceService,
  ACL,
  $q
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.select = select
  ctrl.edit = edit

  function onInit() {
    ctrl.isAdmin = ACL.has('System')
    ctrl.loading = true
    loadServices()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadServices() {
    return ServiceProviderNetworkClassOfServiceService.show(
      ctrl.serviceProviderId
    ).then(function(data) {
      ctrl.services = data.services
    })
  }

  function select(service) {
    if (service.default) return
    Alert.confirm
      .open('Are you sure you want to make this service default?')
      .then(function() {
        Alert.spinner.open()
        ServiceProviderNetworkClassOfServiceService.select(
          ctrl.serviceProviderId,
          service.name
        )
          .then(loadServices)
          .then(function() {
            Alert.notify.success('Default Service Update')
          })
          .catch(Alert.notify.danger)
          .finally(Alert.spinner.close)
      })
  }

  function loadSystemServices() {
    Alert.spinner.open()
    return SystemNetworkClassOfServiceService.index()
      .then(function(data) {
        return data
      })
      .catch(function(error) {
        Alert.notify.danger(error)
        return $q.reject(error)
      })
      .finally(Alert.spinner.close)
  }

  function edit() {
    loadSystemServices().then(function(data) {
      ctrl.available = _.filter(data.services, function(service) {
        return !_.find(ctrl.services, { name: service.name })
      })
      ctrl.selected = angular.copy(ctrl.services)
      Alert.modal.open('serviceProviderNetworkClassOfServiceModal', function(
        close
      ) {
        if(_.isEmpty(ctrl.services)) ctrl.selected[0]['default'] = true /* set default to first element */
        assign(ctrl.selected, close)
      })
    })
  }

  function assign(services, close) {
    Alert.spinner.open()
    ServiceProviderNetworkClassOfServiceService.update(
      ctrl.serviceProviderId,
      services
    )
      .then(loadServices)
      .then(function() {
        Alert.notify.success('Services Update')
        close()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
