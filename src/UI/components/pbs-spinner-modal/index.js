/*
  const spinner = Spinner.open()
  spinner.close() || Spinner.close()
*/
import angular from 'angular'
import template from './index.html'

angular.module('odin.UI').component('pbsSpinnerModal', { template, controller })

controller.$inject = ['Spinner']
function controller(Spinner) {
  const ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.close = close

  function onInit() {
    Spinner.register(ctrl)
  }

  function open() {
    ctrl.isOpen = true
    return { close: close }
  }

  function close() {
    ctrl.isOpen = false
  }
}
