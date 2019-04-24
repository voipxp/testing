import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userCollaborate', {
  template,
  bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
})
