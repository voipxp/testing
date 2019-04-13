import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupOutgoingCallingPlan', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['GroupServiceService', 'Module']
function controller(GroupServiceService, Module) {
  var ctrl = this
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
}
