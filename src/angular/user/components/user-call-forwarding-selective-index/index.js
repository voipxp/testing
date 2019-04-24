import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userCallForwardingSelectiveIndex', {
  template,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<', userId: '<' }
})
