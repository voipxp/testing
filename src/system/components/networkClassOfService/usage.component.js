;(function() {
  angular.module('odin.system').component('systemNetworkClassOfServiceUsage', {
    templateUrl: 'system/components/networkClassOfService/usage.component.html',
    controller: Controller,
    bindings: { name: '<' }
  })

  function Controller(Alert, SystemNetworkClassOfServiceService, Route) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.open = open

    function onInit() {
      ctrl.loading = true
      loadUsage()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadUsage() {
      return SystemNetworkClassOfServiceService.usage(ctrl.name).then(function(
        data
      ) {
        ctrl.usage = data
      })
    }

    function open(serviceProvider) {
      Route.open('serviceProviders', serviceProvider.serviceProviderId)
    }
  }
})()
