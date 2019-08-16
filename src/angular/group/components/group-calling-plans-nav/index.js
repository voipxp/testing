import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallingPlansNav', {
  template,
  controller,
  bindings: {
    callingPlan: '@',
    module: '<',
    serviceProviderId: '<',
    groupId: '<'
  }
})

controller.$inject = ['Route']
function controller(Route) {
  var ctrl = this
  ctrl.open = open

  function open(callingPlan) {
    Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'callingPlans', callingPlan).hash(
      null
    )
  }
}
