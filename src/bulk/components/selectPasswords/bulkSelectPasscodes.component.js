;(function() {
  angular.module('odin.bulk').component('bulkSelectPasscodes', {
    templateUrl:
      'bulk/components/selectPasswords/bulkSelectPasscodes.component.html',
    controller: Controller,
    bindings: { passcode: '<', onUpdate: '&' }
  })

  function Controller(Alert, EventEmitter) {
    var ctrl = this
    ctrl.complete = complete
    ctrl.$onInit = onInit
    ctrl.templates = { passcode: '{{ generatePasscode }}' }

    function onInit() {
      if (ctrl.passcode === undefined) {
        ctrl.passcode = null
      }
      console.log('ctrl.passcode', ctrl.passcode)
    }

    function complete() {
      ctrl.onUpdate(EventEmitter({ passcode: ctrl.passcode }))
    }
  }
})()
