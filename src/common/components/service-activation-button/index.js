import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('serviceActivationButton', {
  template,
  controller,
  bindings: {
    service: '<',
    onUpdate: '&'
  }
})

controller.$inject = ['EventEmitter']
function controller(EventEmitter) {
  var ctrl = this

  ctrl.toggle = function() {
    var service = angular.copy(ctrl.service)
    service.isActive = !service.isActive
    ctrl.onUpdate(EventEmitter({ service: service }))
  }
}
