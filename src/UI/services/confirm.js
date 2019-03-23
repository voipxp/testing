/*
  Confirm.open('Are you sure?').then(function() {
    // do something
  })
*/

import angular from 'angular'

angular.module('odin.UI').factory('Confirm', Confirm)

Confirm.$inject = ['$q']
function Confirm($q) {
  const service = { register: register, open: open, close: close }
  let controller
  return service

  function register(_controller) {
    controller = _controller
  }

  function open(message, callback) {
    if (!controller) return $q.reject()
    return controller.open(message, callback)
  }

  function close() {
    if (controller) return controller.close()
  }
}
