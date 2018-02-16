/*
  var spinner = Spinner.open()
  spinner.close() || Spinner.close()
*/
;(function() {
  angular.module('odin.common').component('pbsSpinnerModal', {
    templateUrl: 'common/UI/alerts/spinner.component.html',
    controller: Controller
  })

  function Controller(Spinner) {
    var ctrl = this
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
})()
