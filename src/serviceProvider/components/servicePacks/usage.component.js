;(function() {
  angular.module('odin.serviceProvider').component('servicePacksServiceUsage', {
    templateUrl: 'serviceProvider/components/servicePacks/usage.component.html',
    controller: Controller,
    require: { parent: '^servicePacks' }
  })

  function Controller(ServicePackService, Alert) {
    var ctrl = this
    ctrl.openSelect = openSelect
    ctrl.select = select

    function openSelect() {
      Alert.modal.open('serviceProviderServiceSelect')
    }

    function select(service) {
      Alert.modal.closeAll()
      Alert.spinner.open()
      ServicePackService.usage(
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
})()
