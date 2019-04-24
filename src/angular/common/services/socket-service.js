import angular from 'angular'
import io from 'socket.io-client'

angular.module('odin.common').factory('SocketService', Service)

Service.$inject = ['$rootScope']
function Service($rootScope) {
  return function(url) {
    const socket = io(url || $rootScope.eventURL)

    function on(eventName, callback) {
      socket.on(eventName, function() {
        const args = arguments
        $rootScope.$apply(() => callback.apply(socket, args))
      })
    }

    function emit(eventName, data, callback) {
      socket.emit(eventName, data, function() {
        const args = arguments
        $rootScope.$apply(() => callback && callback.apply(socket, args))
      })
    }

    function close() {
      socket.close()
    }

    return { close, on, emit }
  }
}
