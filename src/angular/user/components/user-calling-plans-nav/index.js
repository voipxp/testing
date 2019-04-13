import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userCallingPlansNav', {
  template,
  controller,
  bindings: {
    callingPlan: '@',
    serviceProviderId: '<',
    groupId: '<',
    userId: '<'
  }
})

function controller(Route) {
  var ctrl = this
  ctrl.open = open

  function open(callingPlan) {
    Route.open(
      'users',
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.userId,
      'callingPlans',
      callingPlan
    ).hash(null)
  }
}
