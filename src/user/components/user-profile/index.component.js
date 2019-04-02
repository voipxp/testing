;(function() {
  angular.module('odin.user').component('userProfileIndex', {
    templateUrl: 'user/components/profile/index.component.html',
    controller: Controller
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.userId = $routeParams.userId
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
  }
})()
