import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallRecordIndex', {
  template,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})
