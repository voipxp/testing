/*
  Confirm.open('Are you sure?').then(function() {
    // do something
  })
*/
;(function() {
  angular.module('odin.common').factory('Confirm', Confirm)

  function Confirm($q) {
    var service = { register: register, open: open, close: close }
    var controller
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
})()
