import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterCallRecords', {
  template,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})
