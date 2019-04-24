import angular from 'angular'
import template from './index.html'

angular
  .module('odin.bulk')
  .component('bulkSelectSharedCallAppearanceSettings', {
    template,
    controller,
    bindings: { settings: '<', onUpdate: '&' }
  })

controller.$inject = ['EventEmitter']
function controller(EventEmitter) {
  var ctrl = this
  ctrl.next = next

  ctrl.options = {
    bridgeWarningTone: ['None', 'Barge-In', 'Barge-In and Repeat']
  }

  function next() {
    ctrl.onUpdate(EventEmitter({ settings: ctrl.settings }))
  }
}
