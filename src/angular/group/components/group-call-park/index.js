import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallPark', {
  template,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})
