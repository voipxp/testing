import angular from 'angular'
import template from './index.html'

angular.module('odin.branding').component('brandingHostname', {
  template,
  controller,
  bindings: { hostnameId: '<', onDeleteHostname: '&' }
})

controller.$inject = ['Route', '$location']
function controller(Route, $location) {
  var ctrl = this
  ctrl.showNav = !/^\/resellers/.test($location.path())

  ctrl.hostname = 'Loading...'
  ctrl.onUpdate = onUpdate
  ctrl.onDelete = onDelete
  ctrl.back = back

  function onUpdate(event) {
    ctrl.hostname = event.hostname.hostname
  }

  function onDelete(event) {
    if (ctrl.showNav) {
      back()
    } else {
      ctrl.onDeleteHostname()
    }
  }

  function back() {
    Route.open('branding')
  }
}
