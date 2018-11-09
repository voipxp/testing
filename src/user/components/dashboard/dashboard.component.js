/*
  TODO:
  - Premium Call Records Permissions
  - MeetMe Permissions Module(MeetMe) && what else?
  - Announcements Version
  - Quick load or not?
*/
;(function() {
  angular.module('odin.user').component('userDashboard', {
    templateUrl: 'user/components/dashboard/dashboard.component.html',
    controller: Controller
  })

  function Controller($routeParams, ACL, Module, UserPermissionService) {
    var ctrl = this
    ctrl.$onInit = onInit

    function onInit() {
      ctrl.serviceProviderId = $routeParams.serviceProviderId
      ctrl.groupId = $routeParams.groupId
      ctrl.userId = $routeParams.userId
      ctrl.isAdmin = ACL.has('Group')
      ctrl.hasAnnouncements = ACL.hasVersion('20')
      ctrl.loading = true
      UserPermissionService.load(ctrl.userId)
        .then(Permission => {
          ctrl.hasProvisioning = Module.read('Provisioning')
          ctrl.hasViewablePacks = Module.read('Viewable Service Packs')
          ctrl.hasMeetMe = Module.read('Meet-Me Conferencing')
          ctrl.hasCommBarring = Permission.isAssigned(
            'Communication Barring User-Control'
          )
          ctrl.hasSCA = Permission.isAssigned('Shared Call Appearance')
        })
        .catch(err => console.log(err))
        .finally(() => (ctrl.loading = false))
    }
  }
})()
