import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectUcOneSettings', {
  template,
  controller,
  bindings: { settings: '<', onUpdate: '&' }
})

controller.$inject = ['EventEmitter']
function controller(EventEmitter) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.next = next

  ctrl.options = {
    bridgeWarningTone: ['None', 'Barge-In', 'Barge-In and Repeat']
  }

  function onInit() {
    ctrl.settings = ctrl.settings || {
      alertAllAppearancesForClickToDialCalls: false,
      alertAllAppearancesForGroupPagingCalls: true,
      allowSCACallRetrieve: true,
      multipleCallArrangementIsActive: true,
      allowBridgingBetweenLocations: true,
      enableCallParkNotification: true,
      bridgeWarningTone: 'None',
      integratedImp: true
    }
  }

  function next() {
    ctrl.onUpdate(EventEmitter({ settings: ctrl.settings }))
  }
}
