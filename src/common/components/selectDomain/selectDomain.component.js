;(function() {
  angular.module('odin.common').component('selectDomain', {
    templateUrl: 'common/components/selectDomain/selectDomain.component.html',
    controller: Controller,
    bindings: { ngRequired: '<', ngModel: '=' }
  })

  function Controller(Alert, SystemDomainService) {
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
      return SystemDomainService.index().then(function(data) {
        ctrl.domains = data
        return data
      })
    }
  }
})()
