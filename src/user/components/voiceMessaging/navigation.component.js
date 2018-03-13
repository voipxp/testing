;(function() {
  angular.module('odin.user').component('userVoiceMessagingNavigation', {
    templateUrl: 'user/components/voiceMessaging/navigation.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, $location, Module) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
    ctrl.$onInit = function() {
      ctrl.returnTo = $location.search()['returnTo']
      return Module.show('Voice Messaging User - Advanced').then(function(
        data
      ) {
        ctrl.advanced = data.permissions
      })
    }
  }
})()
