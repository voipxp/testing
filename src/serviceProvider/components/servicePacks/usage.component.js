;(function() {
  angular.module('odin.serviceProvider').component('servicePacksServiceUsage', {
    templateUrl: 'serviceProvider/components/servicePacks/usage.component.html',
    controller: Controller,
    bindings: {
      state: '='
    },
    require: {
      parent: '^servicePacks'
    }
  })

  function Controller(ServicePackService, Alert) {
    var ctrl = this
    ctrl.openSelect = openSelect
    ctrl.select = select

    ctrl.$onInit = function() {
      ctrl.filter = ''
      setTitle()
      console.log('onInit')
    }

    function openSelect() {
      Alert.modal.open('serviceProviderServiceSelect')
    }

    function select(service) {
      Alert.modal.closeAll()
      ctrl.loading = true
      ServicePackService.usage(
        ctrl.parent.serviceProviderId,
        service.serviceName
      )
        .then(function(data) {
          ctrl.service = {
            serviceName: service.serviceName,
            usage: data
          }
          setTitle(service)
          console.log('service', ctrl.service)
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function setTitle(service) {
      var title = (service && service.serviceName) || 'Service'
      ctrl.parent.setTitle(ctrl.state, title + ' Usage')
    }
  }
})()
