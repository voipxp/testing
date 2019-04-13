import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupVoiceMessaging', {
  template,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})
