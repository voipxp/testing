;(function() {
  angular.module('odin.common').component('pbsConfirmModal', {
    templateUrl: 'common/UI/alerts/confirm.component.html',
    controller: Controller
  })

  function Controller(Confirm, $q) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.open = open
    ctrl.confirm = confirm
    ctrl.close = close

    var deferred
    var onCancel

    function onInit() {
      Confirm.register(ctrl)
    }

    function open(message, callback) {
      ctrl.message = message || 'Are you sure?'
      this.isOpen = true
      onCancel = callback
      deferred = $q.defer()
      return deferred.promise
    }

    function confirm() {
      this.isOpen = false
      deferred.resolve()
    }

    function close() {
      if (_.isFunction(onCancel)) {
        onCancel()
      }
      this.isOpen = false
    }
  }
})()
