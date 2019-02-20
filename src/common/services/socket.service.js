/* globals io */
;(function() {
  angular.module('odin.common').factory('SocketService', Service)

  function Service($rootScope, APP) {
    return function(url) {
      const socket = io(url || APP.eventURL)

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
})()
