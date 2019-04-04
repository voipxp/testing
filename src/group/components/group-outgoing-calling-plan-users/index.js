import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupOutgoingCallingPlanUsers', {
  template,
  controller
})

controller.$inject = ['$routeParams', 'Route', 'GroupServiceService', 'Module']
function controller($routeParams, Route, GroupServiceService, Module) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.open = open
  ctrl.$onInit = onInit

  function onInit() {
    Module.show('Outgoing Calling Plan').then(function(module) {
      ctrl.module = module
    })
    GroupServiceService.available(ctrl.serviceProviderId, ctrl.groupId).then(
      function(assigned) {
        ctrl.hasCallMeNow = assigned['Call Me Now']
      }
    )
  }

  function open(plan) {
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'callingPlans',
      plan
    )
  }
}
