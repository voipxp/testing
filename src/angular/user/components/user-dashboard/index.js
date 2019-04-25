import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userDashboard', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
})

controller.$inject = [
  'ACL',
  'Module',
  'UserPermissionService',
  'Alert',
  '$rootScope'
]
function controller(ACL, Module, UserPermissionService, Alert, $rootScope) {
  const ctrl = this
  ctrl.$onInit = onInit

  const quickActions = [
    'Call Forwarding Always',
    'Call Forwarding Busy',
    'Call Forwarding No Answer',
    'Do Not Disturb',
    'Remote Office',
    'BroadWorks Anywhere'
  ]

  function onInit() {
    ctrl.isAdmin = ACL.has('Group')
    ctrl.hasAnnouncements = ACL.hasVersion('20')
    ctrl.loading = true
    loadPermissions()
      .catch(error => Alert.notify.danger(error))
      .finally(() => (ctrl.loading = false))
  }

  function loadPermissions() {
    console.log('UserDashboard.loadPermissions()->UserPermissionService.load()')
    return UserPermissionService.load(ctrl.userId).then(Permission => {
      ctrl.hasProvisioning = Module.read('Provisioning')
      ctrl.hasViewablePacks = Module.read('Viewable Service Packs')
      ctrl.hasMeetMe = Module.read('Meet-Me Conferencing')
      ctrl.hasCommBarring = Permission.isAssigned(
        'Communication Barring User-Control'
      )
      ctrl.hasSCA = Permission.read('Shared Call Appearance')
      ctrl.showQuick = quickActions.find(service => Permission.read(service))
    })
  }

  $rootScope.$on('UserServiceService:updated', loadPermissions)
}
