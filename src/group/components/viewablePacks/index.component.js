;(function() {
  angular.module('odin.group').component('groupViewablePacksIndex', {
    templateUrl: 'group/components/viewablePacks/index.component.html',
    controller: Controller
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
  }
})()
