;(function() {
  angular.module('odin.common').factory('Alert', Alert)

  function Alert(Modal, Spinner, Confirm, Notification) {
    var service = {
      modal: Modal,
      spinner: Spinner,
      confirm: Confirm,
      notify: Notification
    }
    return service
  }
})()
