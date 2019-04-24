import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.common').component('servicePackLicensing', {
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
      return hasUnlimited() && ctrl.service.servicePackQuantity === -1
    } else {
      ctrl.service.servicePackQuantity = value ? -1 : 1
    }
  }

  function hasUnlimited() {
    return ctrl.service.allowedQuantity === -1
  }

  function available() {
    return hasUnlimited() ? 'Unlimited' : ctrl.service.allowedQuantity
  }

  function max() {
    return hasUnlimited() ? 99999 : ctrl.service.allowedQuantity
  }
}
