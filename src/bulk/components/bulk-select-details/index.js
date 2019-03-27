import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectDetails', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    timeZone: '<',
    language: '<',
    networkClassOfService: '<',
    onUpdate: '&'
  }
})

controller.$inject = ['EventEmitter']
function controller(EventEmitter) {
  var ctrl = this
  ctrl.complete = complete

  function complete() {
    ctrl.onUpdate(
      EventEmitter({
        timeZone: ctrl.timeZone,
        language: ctrl.language,
        networkClassOfService: ctrl.networkClassOfService
      })
    )
  }
}
