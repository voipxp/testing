;(function() {
  angular.module('odin.bulk').component('bulkSelectUcOneSettings', {
    templateUrl:
      'bulk/components/user.ucone.update/bulkSelectUcOneSettings.component.html',
    controller: Controller,
    bindings: { settings: '<', onUpdate: '&' }
  })

  function Controller(EventEmitter) {
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
})()
