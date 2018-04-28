;(function() {
  angular.module('odin.bulk').component('bulkSelectAddress', {
    templateUrl:
      'bulk/components/selectAddress/bulkSelectAddress.component.html',
    controller: Controller,
    bindings: { address: '<', addressLocation: '<', onUpdate: '&' }
  })

  function Controller(Alert, EventEmitter) {
    var ctrl = this
    ctrl.complete = complete

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
