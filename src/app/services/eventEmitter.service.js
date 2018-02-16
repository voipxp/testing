;(function() {
  angular.module('odin.app').factory('EventEmitter', EventEmitter)

  function EventEmitter() {
    return function(payload) {
      return { $event: payload }
    }
  }
})()
