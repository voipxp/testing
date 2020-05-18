import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupOutgoingCallingPlanUsers', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Route', 'GroupServiceService', 'Module','ACL']
function controller(Route, GroupServiceService, Module,ACL) {
  var ctrl = this
  ctrl.open = open
  ctrl.$onInit = onInit
  ctrl.hideNav  = ACL.is('Group') || ACL.is('Service Provider') || ACL.is('System')
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
