;(function() {
  angular.module('odin.bulk').component('bulkSelectAddress', {
    templateUrl:
      'bulk/components/selectAddress/bulkSelectAddress.component.html',
    controller: Controller,
    bindings: { address: '<', addressLocation: '<', onUpdate: '&' }
  })

  function Controller(Alert, EventEmitter, SystemStateService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.complete = complete

    function onInit() {
      ctrl.loading = true
      loadStates()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadStates() {
      return SystemStateService.index().then(function(data) {
        ctrl.states = data
        return data
      })
    }

    function complete() {
      ctrl.onUpdate(
        EventEmitter({
          addressLocation: ctrl.addressLocation,
          address: ctrl.address
        })
      )
    }
  }
})()
