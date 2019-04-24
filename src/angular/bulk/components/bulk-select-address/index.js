import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectAddress', {
  template,
  controller,
  bindings: { address: '<', addressLocation: '<', onUpdate: '&' }
})

controller.$inject = ['EventEmitter']
function controller(EventEmitter) {
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
