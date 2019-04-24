import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupViewablePacksIndex', {
  template,
  bindings: { serviceProviderId: '<', groupId: '<' }
})
