import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterDnisInstance', {
  template,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    serviceUserId: '<',
    dnisId: '<'
  }
})
