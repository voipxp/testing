import angular from 'angular'

angular.module('odin.common').factory('WebSocketService', Service)

Service.$inject = ['$rootScope', '$q', '$location']
function Service($rootScope, $q, $location) {
  return function() {
    let socket

    function open(url = `ws://${$location.host()}:${$location.port()}/ws`) {
      return $q(resolve => {
        socket = new WebSocket(url)
        socket.onopen = () => resolve()
      })
    }

    function onError(callback) {
      socket.onerror = err => {
        $rootScope.$apply(() => callback(err))
      }
    }

    function onClose(callback) {
      socket.onclose = () => {
        $rootScope.$apply(() => callback())
      }
    }

    function onMessage(callback) {
      socket.onmessage = ({ data }) => {
        $rootScope.$apply(() => callback(JSON.parse(data)))
      }
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
