import angular from 'angular'
import template from './index.html'

angular.module('odin.branding').component('brandingHostname', {
  template,
  controller,
  bindings: { hostnameId: '<', onDeleteHostname: '&' }
})

controller.$inject = ['ACL', 'Route', 'Session']
function controller(ACL, Route, Session) {
  var ctrl = this
  ctrl.hideNav = Session.data('resellerId') || ACL.is('Service Provider') || ACL.is('System') 

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
