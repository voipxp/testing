;(function() {
  angular.module('odin.common').factory('Spinner', Spinner)

  function Spinner() {
    var service = { register: register, open: open, close: close }
    var _controller
    return service

    function register(controller) {
      _controller = controller
    }

    function open() {
      return _controller.open()
    }

    function close() {
      return _controller.close()
    }
  }
})()
