import angular from 'angular'

angular.module('odin.common').factory('WebSocketService', Service)

Service.$inject = ['$rootScope', '$q', '$location']
function Service($rootScope, $q, $location) {
  return function() {
    let socket

    function open(url = `ws://${$location.host()}:${$location.port()}/ws`) {
      return $q(resolve => {
        socket = new WebSocket(url)
        socket.addEventListener('open', () => resolve())
      })
    }

    function onError(callback) {
      socket.addEventListener('error', error => {
        $rootScope.$apply(() => callback(error))
      })
    }

    function onClose(callback) {
      socket.onclose = () => {
        $rootScope.$apply(() => callback())
      }
    }

    function onMessage(callback) {
      socket.addEventListener('message', ({ data }) => {
        $rootScope.$apply(() => callback(JSON.parse(data)))
      })
    }

    function send(type, payload) {
      socket.send(JSON.stringify({ type, payload }))
    }

    function close() {
      socket.close()
      socket = null
    }

    return { open, send, close, onError, onClose, onMessage }
  }
}
