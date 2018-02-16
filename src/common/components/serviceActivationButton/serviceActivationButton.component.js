;(function() {
  angular.module('odin.common').component('serviceActivationButton', {
    templateUrl:
      'common/components/serviceActivationButton/serviceActivationButton.component.html',
    controller: Controller,
    bindings: {
      service: '<',
      onUpdate: '&'
    }
  })

  function Controller(EventEmitter) {
    var ctrl = this

    ctrl.toggle = function() {
      var service = angular.copy(ctrl.service)
      service.isActive = !service.isActive
      ctrl.onUpdate(EventEmitter({ service: service }))
    }
  }
})()
