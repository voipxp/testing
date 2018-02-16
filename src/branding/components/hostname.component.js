;(function() {
  angular.module('odin.branding').component('brandingHostname', {
    templateUrl: 'branding/components/hostname.component.html',
    controller: Controller
  })

  function Controller(BrandingHostnameService, Alert, $routeParams, Route) {
    var ctrl = this

    ctrl.hostname = 'Loading...'
    ctrl.onUpdate = onUpdate
    ctrl.hostnameId = $routeParams.hostnameId
    ctrl.back = back

    function onUpdate(event) {
      console.log('event', event)
      ctrl.hostname = event.hostname.hostname
    }

    function back() {
      Route.open('branding')()
    }
  }
})()
