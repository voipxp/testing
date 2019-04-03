import angular from 'angular'
import template from './index.html'

angular.module('odin.serviceProvider').component('servicePacksServiceUsage', {
  template,
  controller,
  require: { parent: '^servicePacks' }
})

controller.$inject = ['ServiceProviderServicePackService', 'Alert']
function controller(ServiceProviderServicePackService, Alert) {
  var ctrl = this
  ctrl.openSelect = openSelect
  ctrl.select = select

  function openSelect() {
    Alert.modal.open('serviceProviderServiceSelect')
  }

  function select(service) {
    Alert.modal.closeAll()
    Alert.spinner.open()
    ServiceProviderServicePackService.usage(
      ctrl.parent.serviceProviderId,
      service.serviceName
    )
      .then(function(data) {
        ctrl.service = {
          serviceName: service.serviceName,
          usage: data
        }
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
