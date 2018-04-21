;(function() {
  angular.module('odin.user').component('userSharedCallAppearanceAdminIndex', {
    templateUrl:
      'user/components/sharedCallAppearance/adminIndex.component.html',
    controller: Controller
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
  }
})()
