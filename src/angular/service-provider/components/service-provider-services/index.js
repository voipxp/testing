import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.serviceProvider').component('serviceProviderServices', {
  template,
  controller,
  bindings: {
    serviceType: '<',
    serviceProviderId: '<'
  }
})

controller.$inject = [
  'Alert',
  'ServiceProviderServiceService',
  '$filter',
  'ACL'
]
function controller(Alert, ServiceProviderServiceService, $filter, ACL) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$onChanges = onChanges
  ctrl.onClick = onClick
  ctrl.onSelect = onSelect

  ctrl.quantity = function(value) {
    return value === -1 ? 'Unlimited' : value
  }

  ctrl.columns = [
    { key: 'alias', label: 'Service' },
    { key: 'quantityView', label: 'Limit' },
    { key: 'allocatedView', label: 'Allocated' },
    { key: 'authorized', label: 'Authorized', type: 'boolean' },
    { key: 'assigned', label: 'Assigned', type: 'boolean' }
  ]

  function onInit() {
    ctrl.loading = true
    ctrl.canUpdate = ACL.has('Provisioning')
    ctrl.title = $filter('humanize')(ctrl.serviceType)
    return loadServices()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function onChanges(changes) {
    if (changes.serviceProviderId) {
      ctrl.serviceProviderId = changes.serviceProviderId.currentValue
    }
  }

  function loadServices() {
    return ServiceProviderServiceService.show(ctrl.serviceProviderId).then(
      function(data) {
        var services = _.filter(data[ctrl.serviceType], { licensed: true })
        services.forEach(function(service) {
          service.allocatedView = ctrl.quantity(service.allocated)
          service.quantityView = ctrl.quantity(service.quantity)
        })
        ctrl.services = services
      }
    )
  }

  function onClick(service) {
    if (!ctrl.canUpdate) return
    ctrl.editService = angular.copy(service)
    Alert.modal.open('editServiceProviderService', function onSave(close) {
      const runUpdate = () => {
        var singleService = {}
        singleService[ctrl.serviceType] = [ctrl.editService]
        update(singleService, close)
      }
      if (!ctrl.editService.authorized && service.authorized) {
        Alert.confirm
          .open('Are you sure you want to de-authorize this service?')
          .then(runUpdate)
      } else {
        runUpdate()
      }
    })
  }

  function onSelect(event) {
    if (!ctrl.canUpdate) return
    ctrl.editService = { authorized: true, quantity: -1 }
    ctrl.editService.serviceName = 'Edit ' + event.length + ' Services'
    Alert.modal.open('editServiceProviderService', function onSave(close) {
      var services = {}
      services[ctrl.serviceType] = event.map(function(service) {
        return {
          serviceName: service.serviceName,
          authorized: ctrl.editService.authorized,
          quantity: ctrl.editService.quantity
        }
      })
      update(services, close)
    })
  }

  function update(service, callback) {
    Alert.spinner.open()
    ServiceProviderServiceService.update(ctrl.serviceProviderId, service)
      .then(loadServices)
      .then(function() {
        Alert.notify.success('Service Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
