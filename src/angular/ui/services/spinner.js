import angular from 'angular'
import { showLoadingModal, hideLoadingModal } from '/store/ui'

angular.module('odin.ui').factory('Spinner', Spinner)

Spinner.$inject = ['$ngRedux']
function Spinner($ngRedux) {
  return { open, close }
  function open() {
    $ngRedux.dispatch(showLoadingModal())
  }
  function close() {
    $ngRedux.dispatch(hideLoadingModal())
  }
}

// function Spinner() {
//   const service = { register: register, open: open, close: close }
//   let _controller
//   return service

//   function register(controller) {
//     _controller = controller
//   }

//   function open() {
//     return _controller.open()
//   }

//   function close() {
//     return _controller.close()
//   }
// }
