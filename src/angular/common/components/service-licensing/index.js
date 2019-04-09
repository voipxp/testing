import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.common').component('serviceLicensing', {
  template,
  controller,
  bindings: { service: '=' }
})

function controller() {
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
    if (_.isUndefined(ctrl.service.allowed)) return true
    return ctrl.service.allowed === -1
  }

  function available() {
    if (_.isUndefined(ctrl.service.allowed)) return 'Unlimited'
    return ctrl.service.allowed === -1 ? 'Unlimited' : ctrl.service.allowed
  }

  function max() {
    if (_.isUndefined(ctrl.service.allowed)) return 99999
    return ctrl.service.allowed === -1 ? 99999 : ctrl.service.allowed
  }
}
