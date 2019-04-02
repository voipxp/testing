;(function() {
  angular.module('odin.user').component('userPrivacyIndex', {
    templateUrl: 'user/components/privacy/index.component.html',
    controller: Controller
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.userId = $routeParams.userId
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
  }
})()
