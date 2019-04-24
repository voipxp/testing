import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.ui').component('pbsConfirmModal', { template, controller })

controller.$inject = ['Confirm', '$q']
function controller(Confirm, $q) {
  const ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.confirm = confirm
  ctrl.close = close

  let deferred
  let onCancel

  function onInit() {
    Confirm.register(ctrl)
  }

  function open(message, callback) {
    ctrl.message = message || 'Are you sure?'
    this.isOpen = true
    onCancel = callback
    deferred = $q.defer()
    return deferred.promise
  }

  function confirm() {
    this.isOpen = false
    deferred.resolve()
  }

  function close() {
    if (_.isFunction(onCancel)) {
      onCancel()
    }
    this.isOpen = false
  }
}
