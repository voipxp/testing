import angular from 'angular'

angular.module('odin.UI').factory('Spinner', Spinner)

function Spinner() {
  const service = { register: register, open: open, close: close }
  let _controller
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
