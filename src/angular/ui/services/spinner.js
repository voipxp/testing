import angular from 'angular'
import { Loading } from '@/utils/loading'

angular
  .module('odin.ui')
  .factory('Spinner', () => ({ open: Loading.show, close: Loading.hide }))

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
