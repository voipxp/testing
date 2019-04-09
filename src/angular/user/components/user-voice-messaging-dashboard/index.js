import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userVoiceMessagingDashboard', {
  template,
  controller,
  bindings: { userId: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Module', '$q']
function controller(Module, $q) {
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
