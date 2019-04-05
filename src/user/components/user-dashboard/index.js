import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userDashboard', {
  template,
  controller
})

controller.$inject = [
  '$routeParams',
  'ACL',
  'Module',
  'UserPermissionService',
  'Alert',
  '$rootScope'
]
function controller(
  $routeParams,
  ACL,
  Module,
  UserPermissionService,
  Alert,
  $rootScope
) {
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
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
    ctrl.isAdmin = ACL.has('Group')
    ctrl.hasAnnouncements = ACL.hasVersion('20')
    ctrl.loading = true
    loadPermissions()
      .catch(error => Alert.notify.danger(error))
      .finally(() => (ctrl.loading = false))
  }

  function loadPermissions() {
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