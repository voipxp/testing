import angular from 'angular'
import template from './index.html'

angular.module('odin.branding').component('brandingHostname', {
  template,
  controller
})

controller.$inject = ['$routeParams', 'Route']
function controller($routeParams, Route) {
  var ctrl = this

  ctrl.hostname = 'Loading...'
  ctrl.onUpdate = onUpdate
  ctrl.hostnameId = $routeParams.hostnameId
  ctrl.back = back

  function onUpdate(event) {
    ctrl.hostname = event.hostname.hostname
  }

  function back() {
    Route.open('branding')
  }
}
