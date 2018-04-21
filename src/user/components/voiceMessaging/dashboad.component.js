;(function() {
  angular.module('odin.user').component('userVoiceMessagingDashboard', {
    templateUrl: 'user/components/voiceMessaging/dashboard.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Module, $q) {
    var ctrl = this
    ctrl.$onInit = function() {
      return $q
        .all([
          Module.show('Voice Messaging User'),
          Module.show('Voice Messaging User - Advanced')
        ])
        .then(function(results) {
          ctrl.module = results[0]
          ctrl.advanced = results[1]
        })
    }
  }
})()
