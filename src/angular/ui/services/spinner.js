import angular from 'angular'
import { showLoadingModal, hideLoadingModal } from '@/utils/loading'

angular.module('odin.ui').factory('Spinner', Spinner)

function Spinner() {
  return {
    open: () => showLoadingModal(),
    close: () => hideLoadingModal()
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
