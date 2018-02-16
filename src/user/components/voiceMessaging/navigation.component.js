;(function() {
  angular.module('odin.user').component('userVoiceMessagingNavigation', {
    templateUrl: 'user/components/voiceMessaging/navigation.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, $location) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
    ctrl.$onInit = function() {
      ctrl.returnTo = $location.search()['returnTo']
    }
  }
})()
