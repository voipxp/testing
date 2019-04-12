import angular from 'angular'
import template from './index.html'

angular.module('odin.branding').component('brandingHostname', {
  template,
  controller,
  bindings: { hostnameId: '<' }
})

controller.$inject = ['Route']
function controller(Route) {
  var ctrl = this

  ctrl.hostname = 'Loading...'
  ctrl.onUpdate = onUpdate
  ctrl.back = back

  function onUpdate(event) {
    ctrl.hostname = event.hostname.hostname
  }

  function back() {
    Route.open('branding')
  }
}
