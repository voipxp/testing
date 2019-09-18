import angular from 'angular'
import { APP_UPDATE_MUTATION } from '@/graphql'

angular.module('odin.ui').factory('Spinner', Spinner)

Spinner.$inject = ['GraphQL']

function Spinner(GraphQL) {
  const update = loading => {
    return GraphQL.mutate({ mutation: APP_UPDATE_MUTATION, variables: { input: { loading } } })
  }
  return {
    hide: () => update(false),
    show: () => update(true)
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
