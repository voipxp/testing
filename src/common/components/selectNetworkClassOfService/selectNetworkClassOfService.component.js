;(function() {
  angular.module('odin.common').component('selectNetworkClassOfService', {
    templateUrl:
      'common/components/selectNetworkClassOfService/selectNetworkClassOfService.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      ngRequired: '<',
      ngModel: '='
    }
  })

  function Controller(Alert, GroupNetworkClassOfServiceService) {
    var ctrl = this
    ctrl.$onInit = onInit

    function onInit() {
      ctrl.loading = true
      loadNetworkClasses()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadNetworkClasses() {
      return GroupNetworkClassOfServiceService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.services = data.services
        return data
      })
    }
  }
})()
