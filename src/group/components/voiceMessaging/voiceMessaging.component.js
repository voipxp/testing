;(function() {
  angular.module('odin.group').component('groupVoiceMessaging', {
    templateUrl:
      'group/components/voiceMessaging/voiceMessaging.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
  }
})()
