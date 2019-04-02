import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userCallingPlansNav', {
  template,
  controller,
  bindings: { callingPlan: '@' }
})

function controller($routeParams, Route) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.userId = $routeParams.userId
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
