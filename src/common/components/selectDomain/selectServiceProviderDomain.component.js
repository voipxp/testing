;(function() {
  angular.module('odin.common').component('selectServiceProviderDomain', {
    templateUrl:
      'common/components/selectDomain/selectServiceProviderDomain.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      ngRequired: '<',
      ngModel: '='
    }
  })

  function Controller(Alert, ServiceProviderDomainService) {
    var ctrl = this
    ctrl.$onInit = onInit

    function onInit() {
      ctrl.loading = true
      loadDomains()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadDomains() {
      return ServiceProviderDomainService.index(ctrl.serviceProviderId).then(
        function(data) {
          ctrl.domains = data
        }
      )
    }
  }
})()
