// import angular from 'angular'
// import template from './index.html'

// angular.module('odin.user').component('userDashboard', {
//   template,
//   controller,
//   bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
// })

// controller.$inject = [
//   'ACL',
//   'Module',
//   'UserPermissionService',
//   'Alert',
//   '$ngRedux'
// ]
// function controller(ACL, Module, UserPermissionService, Alert, $ngRedux) {
//   const ctrl = this

//   const quickActions = [
//     'Call Forwarding Always',
//     'Call Forwarding Busy',
//     'Call Forwarding No Answer',
//     'Do Not Disturb',
//     'Remote Office',
//     'BroadWorks Anywhere'
//   ]

//   let unsubscribe
//   ctrl.$onDestroy = () => {
//     if (unsubscribe) unsubscribe()
//   }

//   ctrl.$onInit = () => {
//     ctrl.isAdmin = ACL.has('Group')
//     ctrl.hasAnnouncements = ACL.hasVersion('20')
//     ctrl.loading = true
//     const mapState = state => ({
//       services: state.userAssignedServices[ctrl.userId]
//     })
//     unsubscribe = $ngRedux.connect(mapState)(
//       state => state && loadPermissions()
//     )
//   }

//   function loadPermissions() {
//     return UserPermissionService.load(ctrl.userId).then(Permission => {
//       ctrl.hasProvisioning = Module.read('Provisioning')
//       ctrl.hasViewablePacks = Module.read('Viewable Service Packs')
//       ctrl.hasMeetMe = Module.read('Meet-Me Conferencing')
//       ctrl.hasAuthCodes = Permission.read('Communication Barring User-Control')
//       ctrl.hasSCA = Permission.read('Shared Call Appearance')
//       ctrl.showQuick = quickActions.find(service => Permission.read(service))
//       ctrl.loading = false
//     })
//   }
// }
