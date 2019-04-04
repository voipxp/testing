import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupNetworkClassOfServices', {
  template,
  controller
})

controller.$inject = [
  '$routeParams',
  'Alert',
  'GroupNetworkClassOfServiceService',
  'ServiceProviderNetworkClassOfServiceService',
  'ACL',
  '$q'
]
function controller(
  $routeParams,
  Alert,
  GroupNetworkClassOfServiceService,
  ServiceProviderNetworkClassOfServiceService,
  ACL,
  $q
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.select = select
  ctrl.edit = edit
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId

  function onInit() {
    ctrl.isAdmin = ACL.has('Service Provider')
    ctrl.loading = true
    loadServices()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadServices() {
    return GroupNetworkClassOfServiceService.show(
      ctrl.serviceProviderId,
      ctrl.groupId
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
        GroupNetworkClassOfServiceService.select(
          ctrl.serviceProviderId,
          ctrl.groupId,
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

  function loadServiceProviderServices() {
    Alert.spinner.open()
    return ServiceProviderNetworkClassOfServiceService.show(
      ctrl.serviceProviderId
    )
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
    loadServiceProviderServices().then(function(data) {
      ctrl.available = _.filter(data.services, function(service) {
        return !_.find(ctrl.services, { name: service.name })
      })
      ctrl.selected = angular.copy(ctrl.services)
      Alert.modal.open('groupNetworkClassOfServiceModal', function(close) {
        assign(ctrl.selected, close)
      })
    })
  }

  function assign(services, close) {
    Alert.spinner.open()
    GroupNetworkClassOfServiceService.update(
      ctrl.serviceProviderId,
      ctrl.groupId,
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
