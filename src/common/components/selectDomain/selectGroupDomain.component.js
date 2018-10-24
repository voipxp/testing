;(function() {
  angular.module('odin.common').component('selectGroupDomain', {
    templateUrl:
      'common/components/selectDomain/selectGroupDomain.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      ngRequired: '<',
      ngModel: '='
    }
  })

  function Controller(Alert, GroupDomainService) {
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
      return GroupDomainService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.domains = data
      })
    }
  }
})()
