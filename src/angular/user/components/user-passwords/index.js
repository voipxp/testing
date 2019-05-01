import angular from 'angular'

const template = `
<user-password
  user-id="$ctrl.userId"
  service-provider-id="$ctrl.serviceProviderId"
  group-id="$ctrl.groupId"
></user-password>
<user-portal-passcode
  user-id="$ctrl.userId"
  service-provider-id="$ctrl.serviceProviderId"
  group-id="$ctrl.groupId"
></user-portal-passcode>
`
angular.module('odin.user').component('userPasswords', {
  template,
  bindings: { userId: '<', serviceProviderId: '<', groupId: '<' }
})
