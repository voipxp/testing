;(function() {
  angular.module('odin.user').component('userAnnouncementsPage', {
    templateUrl:
      'user/components/announcements/userAnnouncementsPage.component.html',
    controller: Controller
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.userId = $routeParams.userId
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
  }
})()
