;(function() {
  angular.module('odin.serviceProvider').component('serviceProviderServices', {
    templateUrl: 'serviceProvider/components/services/services.component.html',
    controller: Controller,
    bindings: {
      serviceType: '@'
    }
  })

  function Controller(
    Alert,
    ServiceProviderServiceService,
    $routeParams,
    $filter,
    ACL
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges
    ctrl.onClick = onClick
    ctrl.onSelect = onSelect
    ctrl.serviceProviderId = $routeParams.serviceProviderId

    ctrl.quantity = function(value) {
      return value === -1 ? 'Unlimited' : value
    }

    ctrl.columns = [
      { key: 'serviceName', label: 'Service' },
      { key: 'quantityView', label: 'Limit' },
      { key: 'allocatedView', label: 'Allocated' },
      { key: 'authorized', label: 'Authorized', type: 'boolean' }
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
          console.log('data', data)
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
        var runUpdate = function() {
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
})()
