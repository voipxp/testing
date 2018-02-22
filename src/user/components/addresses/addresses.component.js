;(function() {
  angular.module('odin.user').component('userAddresses', {
    templateUrl: 'user/components/addresses/addresses.component.html',
    controller: Controller
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
  }
})()
