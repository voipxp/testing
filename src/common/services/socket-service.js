import angular from 'angular'
import io from 'socket.io-client'

angular.module('odin.common').factory('SocketService', Service)

Service.$inject = ['$rootScope']
function Service($rootScope) {
  return function(url) {
    console.log('url', url)
    console.log('eventURL', $rootScope.eventURL)
    const socket = io(url || $rootScope.eventURL)

    function on(eventName, callback) {
      socket.on(eventName, function() {
        const arguments_ = arguments
        $rootScope.$apply(() => callback.apply(socket, arguments_))
      })
    }

    function emit(eventName, data, callback) {
      socket.emit(eventName, data, function() {
        const arguments_ = arguments
        $rootScope.$apply(() => callback && callback.apply(socket, arguments_))
      })
    }

    function close() {
      socket.close()
    }

    return { close, on, emit }
  }
}
