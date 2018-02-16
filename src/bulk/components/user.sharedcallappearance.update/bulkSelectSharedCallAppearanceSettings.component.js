;(function() {
  angular
    .module('odin.bulk')
    .component('bulkSelectSharedCallAppearanceSettings', {
      templateUrl:
        'bulk/components/user.sharedcallappearance.update/bulkSelectSharedCallAppearanceSettings.component.html',
      controller: Controller,
      bindings: { settings: '<', onUpdate: '&' }
    })

  function Controller(EventEmitter) {
    var ctrl = this
    ctrl.next = next

    ctrl.options = {
      bridgeWarningTone: ['None', 'Barge-In', 'Barge-In and Repeat']
    }

    function next() {
      ctrl.onUpdate(EventEmitter({ settings: ctrl.settings }))
    }
  }
})()
