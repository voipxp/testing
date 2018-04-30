;(function() {
  angular.module('odin.common').component('serviceLicensing', {
    templateUrl: 'common/components/licensing/serviceLicensing.component.html',
    controller: Controller,
    bindings: { service: '=' }
  })

  function Controller() {
    var ctrl = this
    ctrl.isUnlimited = isUnlimited
    ctrl.hasUnlimited = hasUnlimited
    ctrl.available = available
    ctrl.max = max

    function isUnlimited(value) {
      if (_.isUndefined(value)) {
        return hasUnlimited() && ctrl.service.quantity === -1
      } else {
        ctrl.service.quantity = value ? -1 : 1
      }
    }

    function hasUnlimited() {
      var amount = ctrl.service.allowed || ctrl.service.allocated
      return amount === -1
    }

    function available() {
      var amount = ctrl.service.allowed || ctrl.service.allocated
      return amount === -1 ? 'Unlimited' : amount
    }

    function max() {
      var amount = ctrl.service.allowed || ctrl.service.allocated
      return amount === -1 ? 99999 : amount
    }
  }
})()
