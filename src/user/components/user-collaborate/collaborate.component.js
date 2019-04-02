;(function() {
  angular.module('odin.user').component('userCollaborate', {
    templateUrl: 'user/components/collaborate/collaborate.component.html',
    bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
  })
})()
