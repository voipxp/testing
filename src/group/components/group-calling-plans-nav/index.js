import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallingPlansNav', {
  template,
  controller,
  bindings: { callingPlan: '@', module: '<' }
})

controller.$inject = ['$routeParams', 'Route']
function controller($routeParams, Route) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.open = open

  function open(callingPlan) {
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'callingPlans',
      callingPlan
    ).hash(null)
  }
}
