import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupVoiceMessaging', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Module'
]

function controller(Module) {
  var ctrl = this
  loadModule()

  function loadModule() {
    return Module.show("Voice Messaging Group").then(function(data) {
      ctrl.module = data
    })
  }
}
