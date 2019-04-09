import angular from 'angular'

angular.module('odin.ui').factory('Alert', Alert)

Alert.$inject = ['Modal', 'Spinner', 'Confirm', 'Notification']
function Alert(Modal, Spinner, Confirm, Notification) {
  const service = {
    modal: Modal,
    spinner: Spinner,
    confirm: Confirm,
    notify: Notification
  }
  return service
}
