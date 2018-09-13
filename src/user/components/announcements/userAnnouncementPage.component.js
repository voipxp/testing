;(function() {
  angular.module('odin.user').component('userAnnouncementPage', {
    templateUrl:
      'user/components/announcements/userAnnouncementPage.component.html',
    controller: Controller
  })

  function Controller($routeParams, Route) {
    var ctrl = this
    ctrl.userId = $routeParams.userId
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.name = $routeParams.name
    ctrl.mediaType = $routeParams.mediaType

    ctrl.open = function() {
      Route.open(
        'users',
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.userId,
        'announcements'
      )
    }
  }
})()
