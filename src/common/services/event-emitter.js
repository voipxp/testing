import angular from 'angular'

angular.module('odin.common').factory('EventEmitter', EventEmitter)

function EventEmitter() {
  return function(payload) {
    return { $event: payload }
  }
}
