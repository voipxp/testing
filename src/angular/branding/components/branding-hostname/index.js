import angular from 'angular'
import template from './index.html'

angular.module('odin.branding').component('brandingHostname', {
  template,
  controller,
  bindings: { hostnameId: '<', onDeleteHostname: '&' }
})

controller.$inject = ['Route', 'Session']
function controller(Route, Session) {
  var ctrl = this
  ctrl.hideNav = Session.data('resellerId')

  ctrl.hostname = 'Loading...'
  ctrl.onUpdate = onUpdate
  ctrl.onDelete = onDelete
  ctrl.back = back

  function onUpdate(event) {
    ctrl.hostname = event.hostname.hostname
  }

  function onDelete(event) {
    if (ctrl.hideNav) {
      ctrl.onDeleteHostname()
    } else {
      back()
    }
  }

  function back() {
    Route.open('branding')
  }
}
