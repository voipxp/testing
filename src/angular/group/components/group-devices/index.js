import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDevices', {
  template,
  bindings: { serviceProviderId: '<', groupId: '<' }
})
