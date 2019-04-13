import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupUserCallReportIndex', {
  template,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})
