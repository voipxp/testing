import angular from 'angular'
import template from './index.html'

angular.module('odin.vdm').component('vdmDashboard', {
  template,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})
