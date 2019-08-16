import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectPasswords', {
  template,
  controller,
  bindings: { password: '<', onUpdate: '&' }
})

controller.$inject = ['EventEmitter']
function controller(EventEmitter) {
  var ctrl = this
  ctrl.complete = complete
  ctrl.$onInit = onInit
  ctrl.templates = {
    password: '{{ generatePassword }}',
    passcode: '{{ generatePasscode }}'
  }

  function onInit() {
    if (ctrl.password === undefined) {
      ctrl.password = ctrl.templates.password
    }
    if (ctrl.passcode === undefined) {
      ctrl.passcode = ctrl.templates.passcode
    }
  }

  function complete() {
    ctrl.onUpdate(EventEmitter({ password: ctrl.password, passcode: ctrl.passcode }))
  }
}
